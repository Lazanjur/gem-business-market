import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import api from '@/lib/api';
import { setCookie } from 'nookies';

const COUNTRIES = [
  'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic',
  'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary',
  'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands',
  'Poland', 'Portugal', 'Romania', 'Slovakia', 'Slovenia', 'Spain', 'Sweden',
  'United Kingdom',
];

const ENTITY_TYPES = [
  { value: 'limited_company', label: 'Limited Company' },
  { value: 'public_limited', label: 'Public Limited Company (PLC)' },
  { value: 'sole_trader', label: 'Sole Trader' },
  { value: 'public_authority', label: 'Public Authority / Government Body' },
];

export default function Register() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Step 1 fields
  const [companyName, setCompanyName] = useState('');
  const [country, setCountry] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const [entityType, setEntityType] = useState('');

  // Step 2 fields
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!companyName || !country || !regNumber || !entityType) {
      setError('Please fill in all required fields.');
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!agreed) { setError('You must agree to the Terms of Use and Privacy Policy.'); return; }
    setIsLoading(true);
    try {
      const regime = country === 'United Kingdom' ? 'uk' : 'eu';
      const res = await api.post('/auth/register', {
        company_name: companyName,
        country_of_registration: country,
        company_registration_number: regNumber,
        vat_number: vatNumber || undefined,
        entity_type: entityType,
        email,
        full_name: fullName,
        job_title: jobTitle,
        password,
        regulatory_regime: regime,
      });
      setCookie(null, 'ib_token', res.data.access_token, { maxAge: 2592000, path: '/', secure: true, sameSite: 'lax' });
      router.push('/dashboard/search');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head><title>Register — IB Marketplace</title></Head>
      <div className="min-h-screen flex">
        {/* Left panel */}
        <div className="hidden lg:flex w-1/2 bg-ib-dark flex-col justify-between p-12">
          <div className="font-bold text-white text-xl">IB Marketplace</div>
          <div>
            <p className="text-xs font-semibold tracking-widest text-ib-gold mb-4">JOIN THE PLATFORM</p>
            <h2 className="text-4xl font-extrabold text-white mb-4">
              Start trading across<br />
              <span className="text-ib-gold italic">20 European markets.</span>
            </h2>
            <p className="text-slate-400 mb-8">KYB-verified registration. Your company is verified against national registries within 24 hours.</p>
            <ul className="space-y-3 text-slate-300 text-sm">
              <li>✓ KYB verification in 24 hours</li>
              <li>✓ Access to 12,400+ verified suppliers</li>
              <li>✓ EU GDPR + UK GDPR compliant</li>
              <li>✓ Location-aware supplier discovery</li>
              <li>✓ RFQ & public procurement tenders</li>
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-6 h-2 rounded-full ${step === 1 ? 'bg-ib-gold' : 'bg-slate-600'}`} />
              <div className={`w-6 h-2 rounded-full ${step === 2 ? 'bg-ib-gold' : 'bg-slate-600'}`} />
              <span className="text-slate-400 text-xs ml-2">STEP {step} OF 2</span>
            </div>
            <p className="text-slate-500 text-xs">KYB VERIFICATION REQUIRED · B2B & B2G ONLY · EU GDPR COMPLIANT</p>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {step === 1 ? (
              <>
                <h1 className="text-3xl font-extrabold text-ib-dark mb-2">Register your business</h1>
                <p className="text-slate-500 mb-8">Enter your company details for KYB verification</p>
                {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>}
                <form onSubmit={handleStep1} className="space-y-5">
                  <Input label="Legal company name" type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required placeholder="Acme Ltd" />
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Country of registration <span className="text-red-500">*</span></label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ib-blue"
                    >
                      <option value="">Select country...</option>
                      {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <Input label="Company registration number" type="text" value={regNumber} onChange={(e) => setRegNumber(e.target.value)} required placeholder="e.g. 12345678" />
                  <Input label="VAT number (optional)" type="text" value={vatNumber} onChange={(e) => setVatNumber(e.target.value)} placeholder="e.g. GB123456789" />
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Entity type <span className="text-red-500">*</span></label>
                    <select
                      value={entityType}
                      onChange={(e) => setEntityType(e.target.value)}
                      required
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ib-blue"
                    >
                      <option value="">Select entity type...</option>
                      {ENTITY_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>
                  <Button type="submit" className="w-full">Continue →</Button>
                </form>
                <p className="mt-6 text-center text-sm text-slate-500">Already have an account? <Link href="/login" className="text-ib-blue font-semibold">Sign in</Link></p>
              </>
            ) : (
              <>
                <h1 className="text-3xl font-extrabold text-ib-dark mb-2">Account credentials</h1>
                <p className="text-slate-500 mb-8">Set your login email and a strong password</p>
                {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>}
                <form onSubmit={handleSubmit} autoComplete="off" className="space-y-5">
                  <Input label="Business email" type="email" name="register-email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="off" placeholder="you@company.com" />
                  <Input label="Full name" type="text" name="register-fullname" value={fullName} onChange={(e) => setFullName(e.target.value)} required autoComplete="off" placeholder="Your full name" />
                  <Input label="Job title" type="text" name="register-jobtitle" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required autoComplete="off" placeholder="e.g. CEO, Procurement Manager" />
                  <Input label="Password" type="password" name="register-password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="new-password" placeholder="Min. 12 characters" />
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="terms" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1" />
                    <label htmlFor="terms" className="text-sm text-slate-500">
                      I agree to the <Link href="/terms" className="text-ib-blue">Terms of Use</Link> and <Link href="/privacy" className="text-ib-blue">Privacy Policy</Link>
                    </label>
                  </div>
                  <Button type="submit" className="w-full" isLoading={isLoading}>Create account →</Button>
                  <Button type="button" variant="secondary" className="w-full" onClick={() => setStep(1)}>Back</Button>
                </form>
                <p className="mt-6 text-center text-sm text-slate-500">Already have an account? <Link href="/login" className="text-ib-blue font-semibold">Sign in</Link></p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
