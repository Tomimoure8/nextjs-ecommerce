import React from 'react';

function FooterContact() {
    return (
        <footer className="bg-blue-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h5 className="uppercase font-bold mb-2">Contáctanos</h5>
                        <ul className="list-none">
                            <li className="mb-2">
                                <a href="mailto:info@digitalshop.com" className="text-teal-400 hover:text-white">info@digitalshop.com</a>
                            </li>
                            <li className="mb-2">
                                <a href="tel:+1234567890" className="text-teal-400 hover:text-white">+1 234 567 890</a>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h5 className="uppercase font-bold mb-2">Síguenos</h5>
                        <ul className="list-none flex space-x-4">
                            <li>
                                <a href="#" className="text-teal-400 hover:text-white">Facebook</a>
                            </li>
                            <li>
                                <a href="#" className="text-teal-400 hover:text-white">Twitter</a>
                            </li>
                            <li>
                                <a href="#" className="text-teal-400 hover:text-white">Instagram</a>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3">
                        <h5 className="uppercase font-bold mb-2">Newsletter</h5>
                        <form>
                            <input type="email" placeholder="Tu correo electrónico" className="w-full p-2 mb-2 text-gray-800" />
                            <button type="submit" className="w-full bg-orange-500 text-white p-2">Suscribirse</button>
                        </form>
                    </div>
                </div>
                <div className="text-center mt-8">
                    <p>&copy; 2025 Digital Shop. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}

export default FooterContact;