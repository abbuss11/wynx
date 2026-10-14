import React, { useState, useEffect } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { WynxLogo } from '../brand/WynxLogo';
import { 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  ArrowLeft, 
  AlertTriangle, 
  Terminal, 
  Clock, 
  KeyRound,
  CheckCircle2,
} from 'lucide-react';
import { checkRateLimit } from '../../utils/security';

interface SudoLoginViewProps {
  onReturnToPublic: () => void;
}

export const SudoLoginView: React.FC<SudoLoginViewProps> = ({ onReturnToPublic }) => {
  const { loginAdmin } = useSiteData();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [rateLimitInfo, setRateLimitInfo] = useState(checkRateLimit());
  const [isVerifying, setIsVerifying] = useState(false);

  // Countdown timer for lockout
  useEffect(() => {
    if (!rateLimitInfo.isLocked) return;

    const interval = setInterval(() => {
      const status = checkRateLimit();
      setRateLimitInfo(status);
      if (!status.isLocked) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [rateLimitInfo.isLocked]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rateLimitInfo.isLocked) return;
    if (!email.trim() || !password) {
      setErrorMsg('Veuillez saisir votre adresse e-mail et votre mot de passe.');
      return;
    }

    setIsVerifying(true);
    setErrorMsg('');

    try {
      const success = await loginAdmin(email, password);
      if (!success) {
        const updatedStatus = checkRateLimit();
        setRateLimitInfo(updatedStatus);
        if (updatedStatus.isLocked) {
          setErrorMsg(`Trop de tentatives incorrectes. Accès verrouillé pour ${Math.ceil(updatedStatus.remainingSeconds / 60)} minutes.`);
        } else {
          setErrorMsg(`Identifiants non reconnus. (${updatedStatus.attemptsLeft} tentative(s) restante(s))`);
        }
      }
    } catch {
      setErrorMsg('Erreur lors de la vérification des identifiants.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07080B] text-[#ECEFF4] font-body flex flex-col justify-between p-6 sm:p-10 selection:bg-[#FF5500]/30 selection:text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FF5500]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between z-10">
        <button
          onClick={onReturnToPublic}
          className="flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer py-2 px-3 rounded-lg hover:bg-white/[0.04]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour au site public</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono-data text-neutral-400">
          <Terminal className="w-3.5 h-3.5 text-[#FF5500]" />
          <span>GATEWAY /sudo</span>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md mx-auto w-full my-auto py-8 z-10">
        <div className="p-8 sm:p-10 rounded-2xl bg-[#0F121C] border border-white/10 shadow-2xl space-y-6">
          {/* Logo & Header */}
          <div className="text-center space-y-3">
            <div className="inline-block">
              <WynxLogo variant="full" height="34px" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FF5500]/10 border border-[#FF5500]/20 text-[10px] font-mono-data uppercase font-semibold text-[#FF5500] mb-2">
                <Lock className="w-3 h-3" />
                <span>Zone Restreinte /sudo</span>
              </div>
              <h1 className="font-display text-2xl font-bold text-white">
                Console d'Administration
              </h1>
              <p className="text-xs text-neutral-400 mt-1">
                Authentification forte requise pour accéder aux modules de gestion
              </p>
            </div>
          </div>

          {/* Rate limit warning if locked */}
          {rateLimitInfo.isLocked && (
            <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/30 text-xs text-red-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-red-400">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Protection Anti-Brute-Force Active</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Le système a temporairement verrouillé les accès suite à de multiples échecs répétés.
              </p>
              <div className="flex items-center gap-2 font-mono-data text-red-300 font-bold text-sm">
                <Clock className="w-4 h-4" />
                <span>Temps restant : {rateLimitInfo.remainingSeconds}s</span>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300" htmlFor="admin-email">Adresse e-mail</label>
              <input
                id="admin-email"
                type="email"
                autoComplete="username"
                required
                disabled={rateLimitInfo.isLocked || isVerifying}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@exemple.com"
                className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#090A0D] border border-white/10 text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#FF5500] disabled:opacity-50"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300 flex items-center justify-between" htmlFor="admin-password">
                <span>Mot de passe</span>
                {!rateLimitInfo.isLocked && rateLimitInfo.attemptsLeft < 5 && (
                  <span className="text-[10px] font-mono-data text-amber-400">
                    {rateLimitInfo.attemptsLeft} essai(s) restant(s)
                  </span>
                )}
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  disabled={rateLimitInfo.isLocked || isVerifying}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Saisissez votre mot de passe..."
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-[#090A0D] border border-white/10 text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#FF5500] disabled:opacity-50"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-900/30 border border-red-500/20 text-xs text-red-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={rateLimitInfo.isLocked || isVerifying}
              className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#FF5500] hover:bg-[#E64D00] disabled:bg-neutral-800 disabled:text-neutral-500 rounded-xl shadow-lg shadow-[#FF5500]/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
            >
              <span>{isVerifying ? 'Vérification sécurisée...' : 'Déverrouiller la Console'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Security details badges */}
          <div className="pt-4 border-t border-white/[0.06] space-y-2 text-[11px] text-neutral-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Authentification gérée par Supabase Auth</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Isolation complète de l'espace d'administration</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-5xl mx-auto w-full text-center text-xs text-neutral-600 font-mono-data z-10">
        WYNX Agency Security Framework v2.4 · All access logs recorded
      </div>
    </div>
  );
};
