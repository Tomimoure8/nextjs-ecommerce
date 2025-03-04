import React, {useState} from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function ContactForm() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const contactCollection = collection(db, 'contactMessages');
            await addDoc(contactCollection, formData);

            setFormData({ name: '', email: '', message: '' });
            alert('Mensaje enviado con éxito');
        } catch (error) {
            console.error('Error al enviar el mensaje:', error);
            alert('Error al enviar el mensaje');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-black p-5 rounded-lg shadow-2xl text-yellow-500 font-sans">
            <label htmlFor="name" className="block mb-2">Nombre:</label>
            <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 mb-5 rounded-md border-none shadow-lg"
            />
            
            <label htmlFor="email" className="block mb-2">Email:</label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 mb-5 rounded-md border-none shadow-lg"
            />
            
            <label htmlFor="message" className="block mb-2">Mensaje:</label>
            <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-2 mb-5 rounded-md border-none shadow-lg"
            ></textarea>
            
            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-yellow-500 text-black p-2 rounded-md border-none shadow-lg cursor-pointer"
            >
                {isSubmitting ? 'Enviando...' : 'Enviar'}
            </button>
        </form>
    );
}