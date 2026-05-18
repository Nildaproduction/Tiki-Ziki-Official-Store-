import { useState } from 'react';

export function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <div className="bg-primary text-primary-foreground py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="mb-4 text-primary-foreground uppercase tracking-wider">Join the Community</h2>
        <p className="text-primary-foreground/80 mb-8" style={{ fontSize: '1.125rem' }}>
          Get exclusive access to limited drops, presale tickets, and 15% off your first order
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-6 py-4 bg-primary-foreground text-primary focus:outline-none focus:ring-2 focus:ring-primary-foreground"
            required
          />
          <button
            type="submit"
            className="px-10 py-4 bg-primary-foreground text-primary uppercase tracking-wide hover:bg-primary-foreground/90 transition-colors whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>

        <p className="mt-6 text-sm text-primary-foreground/60">
          By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
