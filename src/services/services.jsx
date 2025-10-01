// services/service.jsx
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  serverTimestamp,
  limit
} from 'firebase/firestore';
import { db } from '../firebase';
import { useState, useEffect } from 'react';

export const service = {
  // ==================== FILM REVIEWS ====================
  
  // ✅ Add film review
  async addReview(filmId, reviewData) {
    try {
      const review = {
        ...reviewData,
        filmId,
        type: 'film', // Tandai sebagai review film
        createdAt: serverTimestamp(),
        likes: 0,
        reported: false
      };
      
      const docRef = await addDoc(collection(db, 'reviews'), review);
      console.log('✅ Film review added:', docRef.id);
      return { id: docRef.id, ...review };
    } catch (error) {
      console.error('❌ Error adding film review:', error);
      throw error;
    }
  },

  // ✅ Get film reviews
  getFilmReviews(filmId, callback) {
    const q = query(
      collection(db, 'reviews'),
      where('filmId', '==', filmId),
      where('type', '==', 'film'),
      orderBy('createdAt', 'desc')
    );
    
    return onSnapshot(q, (snapshot) => {
      const reviews = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(reviews);
    });
  },

  // ✅ Get ALL reviews (for About page dropdown)
  getAllReviews(callback) {
    const q = query(
      collection(db, 'reviews'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );
    
    return onSnapshot(q, (snapshot) => {
      const reviews = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(reviews);
    });
  },

  // ==================== WEBSITE REVIEWS ====================
  
  // ✅ Add website review
  async addWebsiteReview(reviewData) {
    try {
      const review = {
        ...reviewData,
        type: 'website', // Tandai sebagai review website
        createdAt: serverTimestamp(),
        likes: 0
      };
      
      const docRef = await addDoc(collection(db, 'reviews'), review);
      console.log('✅ Website review added:', docRef.id);
      return { id: docRef.id, ...review };
    } catch (error) {
      console.error('❌ Error adding website review:', error);
      throw error;
    }
  },

  // ✅ Get website reviews
  getWebsiteReviews(callback) {
    const q = query(
      collection(db, 'reviews'),
      where('type', '==', 'website'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );
    
    return onSnapshot(q, (snapshot) => {
      const reviews = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(reviews);
    });
  }
};

// ==================== CUSTOM HOOKS ====================

// 🎣 Hook untuk film reviews
export const useFilmReviews = (filmId) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!filmId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = service.getFilmReviews(filmId, (reviewsData) => {
      setReviews(reviewsData);
      setLoading(false);
      setError(null);
    });

    return () => unsubscribe();
  }, [filmId]);

  return { reviews, loading, error };
};

// 🎣 Hook untuk semua reviews
export const useAllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = service.getAllReviews((reviewsData) => {
      setReviews(reviewsData);
      setLoading(false);
      setError(null);
    });

    return () => unsubscribe();
  }, []);

  return { reviews, loading, error };
};

// 🎣 Hook untuk website reviews
export const useWebsiteReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = service.getWebsiteReviews((reviewsData) => {
      setReviews(reviewsData);
      setLoading(false);
      setError(null);
    });

    return () => unsubscribe();
  }, []);

  return { reviews, loading, error };
};

// ==================== SUBMIT HOOKS ====================

// 🎣 Hook untuk submit film review
export const useSubmitReview = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const submitReview = async (filmId, reviewData) => {
    setSubmitting(true);
    setError(null);
    
    try {
      const result = await service.addReview(filmId, reviewData);
      setSubmitting(false);
      return result;
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
      throw err;
    }
  };

  return { submitReview, submitting, error };
};

// 🎣 Hook untuk submit website review
export const useSubmitWebsiteReview = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const submitWebsiteReview = async (reviewData) => {
    setSubmitting(true);
    setError(null);
    
    try {
      const result = await service.addWebsiteReview(reviewData);
      setSubmitting(false);
      return result;
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
      throw err;
    }
  };

  return { submitWebsiteReview, submitting, error };
};

// ==================== UTILITY FUNCTIONS ====================

// 🕒 Format timestamp
export const formatFirebaseDate = (timestamp) => {
  if (!timestamp) return 'Baru saja';
  
  try {
    const date = timestamp.toDate();
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Baru saja';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} jam yang lalu`;
    } else {
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    }
  } catch (error) {
    return 'Baru saja';
  }
};

// 🎬 Map film ID to title
export const getFilmTitle = (filmId) => {
  const filmTitles = {
    '2baf70d1-42bb-4437-b551-e5fed5a87abe': 'My Neighbor Totoro',
    '58611129-2dbc-4a81-a72f-77ddfc1b1b49': 'Grave of the Fireflies',
    'ea660b10-85c4-4ae3-8a5f-41cea3648e3e': "Kiki's Delivery Service",
    'dc2e6bd1-8156-4886-adff-b39e6043af0c': 'Spirited Away',
    '90b72513-afd4-4570-84de-a56c312fdf81': 'The Cat Returns',
    'cd3d059c-09f4-4ff3-8d63-bc765a5184fa': 'Howl\'s Moving Castle',
    '112c1e67-726f-40b1-ac17-6974127bb55b': 'Tales from Earthsea',
    '758bf02e-3122-46e0-884e-67cf83df1786': 'Ponyo',
    '0440483e-ca0e-4120-8c50-4c8cd9b965d6': 'Princess Mononoke',
    '45204234-adfd-45cb-a505-a8e7a676b114': 'My Neighbors the Yamadas',
    '4e236f34-b981-41c3-8c65-f8c9000b94e7': 'Only Yesterday',
    'ebbb6b7c-945c-41ee-a792-de0e43191bd8': 'Porco Rosso',
    '1b67aa9a-2e4a-45af-ac98-64d6ad15b16c': 'Pom Poko',
    'ff24da26-a969-4f0e-ba1e-a122ead6c6e3': 'Whisper of the Heart',
    '049b02c5-7a0d-41b0-9c81-514c0e48d7b5': 'The Tale of the Princess Kaguya',
    '5fdfb320-2a02-49a7-94ff-5ca418cae602': 'When Marnie Was There'
  };
  
  return filmTitles[filmId] || 'Studio Ghibli Film';
};

// 🔍 Validate review text
export const validateReview = (text) => {
  if (!text || text.trim().length === 0) {
    return 'Review tidak boleh kosong';
  }
  
  if (text.length > 500) {
    return 'Review maksimal 500 karakter';
  }
  
  return null;
};

export default service;