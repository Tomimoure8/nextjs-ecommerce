import React from 'react';

export default function ContactForm() {
    return (
        <>
            <form className="bg-black p-5 rounded-lg shadow-2xl text-yellow-500 font-sans">
                <label htmlFor="name" className="block mb-2">Nombre:</label>
                <input type="text" id="name" name="name" required className="w-full p-2 mb-5 rounded-md border-none shadow-lg" />
                
                <label htmlFor="email" className="block mb-2">Email:</label>
                <input type="email" id="email" name="email" required className="w-full p-2 mb-5 rounded-md border-none shadow-lg" />
                
                <label htmlFor="message" className="block mb-2">Mensaje:</label>
                <textarea id="message" name="message" required className="w-full p-2 mb-5 rounded-md border-none shadow-lg"></textarea>
                
                <button type="submit" className="bg-yellow-500 text-black p-2 rounded-md border-none shadow-lg cursor-pointer">Enviar</button>
            </form>
        </>
    );
}