import ContactForm from "../../src/components/ContactForm";

export const metadata = {
    title: "Contacto - ecommerce-platform",
    description: "Página de contacto de la plataforma de ecommerce",
};

export default function ContactPage() {
    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-4xl font-bold text-center text-gray-400 mb-4">Contáctanos</h1>
            <p className="text-lg text-center text-gray-300 mb-6">Por favor, rellena el siguiente formulario para contactarnos.</p>
            <ContactForm />
        </div>
    );
}