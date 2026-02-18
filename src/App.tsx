import { useState, useEffect } from 'react';
import { 
  Cloud, Upload, Share2, Folder, File, Link, 
  ChevronRight, Check, Menu, X, Play, 
  Zap, Globe, Users, Clock, ArrowRight, Star,
  MessageCircle, Youtube, Github, HardDrive,
  Download, Trash2, MoreVertical, Copy, ExternalLink,
  Search, Grid, List as ListIcon, Settings,
  LogOut, Plus, ChevronDown, Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import './App.css';

// Types
interface FileItem {
  id: string;
  name: string;
  size: string;
  type: string;
  platform: 'telegram' | 'youtube' | 'github' | 'local';
  date: string;
  folder?: string;
}

interface Folder {
  id: string;
  name: string;
  count: number;
}

// Mock Data
const mockFiles: FileItem[] = [
  { id: '1', name: 'Project Presentation.pdf', size: '2.4 MB', type: 'pdf', platform: 'local', date: '2024-01-15', folder: 'Work' },
  { id: '2', name: 'Vacation Video.mp4', size: '45.2 MB', type: 'video', platform: 'youtube', date: '2024-01-14', folder: 'Personal' },
  { id: '3', name: 'Code Backup.zip', size: '12.8 MB', type: 'zip', platform: 'github', date: '2024-01-13', folder: 'Development' },
  { id: '4', name: 'Team Photo.jpg', size: '3.1 MB', type: 'image', platform: 'telegram', date: '2024-01-12', folder: 'Personal' },
  { id: '5', name: 'Document.docx', size: '1.2 MB', type: 'doc', platform: 'local', date: '2024-01-11' },
  { id: '6', name: 'Tutorial Video.mp4', size: '78.5 MB', type: 'video', platform: 'youtube', date: '2024-01-10' },
];

const mockFolders: Folder[] = [
  { id: '1', name: 'Work', count: 12 },
  { id: '2', name: 'Personal', count: 8 },
  { id: '3', name: 'Development', count: 24 },
  { id: '4', name: 'Shared', count: 5 },
];

// Navigation Component
function Navigation({ onGetStarted, isLoggedIn }: { onGetStarted: () => void; isLoggedIn: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoggedIn) return null;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-cloud-blue to-cloud-purple rounded-xl flex items-center justify-center">
              <Cloud className="w-6 h-6 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-cloud-dark">CloudDrive</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {['Features', 'How It Works', 'Pricing', 'FAQ'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm font-medium text-gray-600 hover:text-cloud-blue transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cloud-blue transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" onClick={onGetStarted} className="text-sm font-medium">Sign In</Button>
            <Button onClick={onGetStarted} className="bg-cloud-blue hover:bg-cloud-blue/90 text-white rounded-full px-6">
              Get Started
            </Button>
          </div>

          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            {['Features', 'How It Works', 'Pricing', 'FAQ'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="block py-2 text-gray-600 hover:text-cloud-blue" onClick={() => setMobileMenuOpen(false)}>
                {item}
              </a>
            ))}
            <Button onClick={onGetStarted} className="w-full bg-cloud-blue text-white">Get Started</Button>
          </div>
        </div>
      )}
    </nav>
  );
}

// Hero Section
function HeroSection({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-cloud-blue/10 rounded-full blur-xl animate-float" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-cloud-purple/10 rounded-full blur-xl animate-float-slow" />
        <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-cloud-blue/5 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <Badge className="bg-cloud-blue/10 text-cloud-blue border-0 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase">
              Cloud Storage Reimagined
            </Badge>
            
            <h1 className="font-display font-extrabold text-5xl lg:text-6xl xl:text-7xl text-cloud-dark leading-tight">
              Your Files,{' '}
              <span className="text-gradient">Everywhere.</span>{' '}
              Unified.
            </h1>
            
            <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
              Transform YouTube, Telegram, and GitHub into your personal cloud storage. 
              One dashboard, unlimited possibilities.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button onClick={onGetStarted} size="lg" className="bg-cloud-blue hover:bg-cloud-blue/90 text-white rounded-full px-8 h-14 text-base font-semibold animate-pulse-glow">
                Start Free Trial
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-base font-semibold border-2">
                <Play className="w-5 h-5 mr-2 fill-current" />
                See How It Works
              </Button>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                    U{i}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                Trusted by <span className="font-semibold text-cloud-dark">10,000+</span> users worldwide
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-gray-500">Hello, Kevin</p>
                  <h3 className="font-display font-bold text-xl">My Cloud Drive</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cloud-blue to-cloud-purple" />
              </div>

              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input placeholder="Search files..." className="pl-10 bg-gray-50 border-0" />
              </div>

              <div className="grid grid-cols-4 gap-3 mb-6">
                {[
                  { icon: Folder, color: 'bg-blue-100 text-blue-600', label: 'Work' },
                  { icon: File, color: 'bg-purple-100 text-purple-600', label: 'Docs' },
                  { icon: ImageIcon, color: 'bg-green-100 text-green-600', label: 'Photos' },
                  { icon: Music, color: 'bg-pink-100 text-pink-600', label: 'Music' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium text-gray-600">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-700">Recent Files</p>
                {mockFiles.slice(0, 3).map((file) => (
                  <div key={file.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <FileIcon type={file.type} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">{file.size} • {file.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute -top-6 -right-6 w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg animate-float">
              <Star className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-green-400 rounded-2xl flex items-center justify-center shadow-lg animate-float-slow">
              <Zap className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// File Icon Helper
function FileIcon({ type }: { type: string }) {
  const colors: Record<string, string> = {
    pdf: 'bg-red-100 text-red-600',
    video: 'bg-purple-100 text-purple-600',
    image: 'bg-green-100 text-green-600',
    doc: 'bg-blue-100 text-blue-600',
    zip: 'bg-yellow-100 text-yellow-600',
    default: 'bg-gray-100 text-gray-600',
  };
  
  return (
    <div className={`w-10 h-10 rounded-lg ${colors[type] || colors.default} flex items-center justify-center flex-shrink-0`}>
      <File className="w-5 h-5" />
    </div>
  );
}

function ImageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}

function Music({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

// Features Section
function FeaturesSection() {
  const features = [
    { icon: Globe, title: 'Unified Dashboard', desc: 'Manage all your files from YouTube, Telegram, and GitHub in one beautiful interface.', color: 'from-blue-500 to-cyan-500' },
    { icon: Upload, title: 'Smart Upload', desc: 'Drag, drop, or paste. Our intelligent system routes files to the optimal storage platform.', color: 'from-purple-500 to-pink-500' },
    { icon: Share2, title: 'Instant Sharing', desc: 'Generate shareable links in seconds. Control access with granular permissions.', color: 'from-green-500 to-emerald-500' },
    { icon: Zap, title: 'Auto-Sync', desc: 'Changes sync automatically across all connected platforms. Never lose a file again.', color: 'from-yellow-500 to-orange-500' },
    { icon: Clock, title: 'Version History', desc: 'Track every change. Restore previous versions with a single click.', color: 'from-red-500 to-rose-500' },
    { icon: Users, title: 'Team Collaboration', desc: 'Share folders, comment on files, and work together in real-time.', color: 'from-indigo-500 to-violet-500' },
  ];

  return (
    <section id="features" className="py-24 bg-cloud-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge className="bg-cloud-blue/10 text-cloud-blue border-0 mb-4">Powerful Features</Badge>
          <h2 className="font-display font-extrabold text-4xl lg:text-5xl text-cloud-dark mb-4">Everything You Need</h2>
          <p className="text-gray-600">A complete cloud storage solution that works with your favorite platforms</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="group bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-display font-bold text-xl text-cloud-dark mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// How It Works Section
function HowItWorksSection() {
  const steps = [
    { num: '01', title: 'Connect Your Platforms', desc: 'Link your YouTube, Telegram, and GitHub accounts with one-click authentication.', icon: Link },
    { num: '02', title: 'Upload & Organize', desc: 'Drag and drop files or import directly from connected platforms. We\'ll handle the rest.', icon: Upload },
    { num: '03', title: 'Share & Collaborate', desc: 'Generate links, set permissions, and work together seamlessly.', icon: Share2 },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Badge className="bg-cloud-blue/10 text-cloud-blue border-0 mb-4">Simple Process</Badge>
            <h2 className="font-display font-extrabold text-4xl lg:text-5xl text-cloud-dark mb-4">How It Works</h2>
            <p className="text-gray-600 mb-12">Get started in minutes. Three simple steps to cloud freedom.</p>

            <div className="space-y-8">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cloud-blue to-cloud-purple flex items-center justify-center text-white font-display font-bold text-lg group-hover:scale-110 transition-transform">
                      {step.num}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-0.5 h-12 bg-gradient-to-b from-cloud-blue to-transparent ml-7 mt-2" />
                    )}
                  </div>
                  <div className="pb-8">
                    <h3 className="font-display font-bold text-xl text-cloud-dark mb-2">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-cloud-blue/5 to-cloud-purple/5 rounded-3xl p-8">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                    <Youtube className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                    <Github className="w-6 h-6 text-gray-800" />
                  </div>
                  <div className="ml-auto">
                    <Badge className="bg-green-100 text-green-700 border-0">Connected</Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-700">Telegram Channel Linked</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-700">YouTube Account Connected</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-700">GitHub Repository Access</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Storage Used</span>
                    <span className="text-sm font-semibold">45.2 GB / 100 GB</span>
                  </div>
                  <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full w-[45%] bg-gradient-to-r from-cloud-blue to-cloud-purple rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <section className="py-24 bg-cloud-dark relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cloud-blue/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cloud-purple/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <Badge className="bg-white/10 text-white border-0 mb-6">Ready to Get Started?</Badge>
        <h2 className="font-display font-extrabold text-4xl lg:text-5xl text-white mb-6">
          Transform Your File Management Today
        </h2>
        <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
          Join thousands of users who have simplified their cloud storage. Start your free trial now.
        </p>
        <Button onClick={onGetStarted} size="lg" className="bg-white text-cloud-dark hover:bg-gray-100 rounded-full px-10 h-14 text-base font-semibold">
          Start Free Trial
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </section>
  );
}

// Pricing Section
function PricingSection() {
  const plans = [
    { name: 'Basic', price: '$9', period: '/month', features: ['10 GB storage', '3 platform connections', 'Basic sharing', 'Email support'], popular: false },
    { name: 'Pro', price: '$19', period: '/month', features: ['100 GB storage', 'Unlimited connections', 'Advanced sharing', 'Priority support', 'Version history'], popular: true },
    { name: 'Business', price: '$49', period: '/month', features: ['Unlimited storage', 'Unlimited connections', 'Team collaboration', '24/7 support', 'Admin dashboard', 'API access'], popular: false },
  ];

  return (
    <section id="pricing" className="py-24 bg-cloud-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge className="bg-cloud-blue/10 text-cloud-blue border-0 mb-4">Pricing Plans</Badge>
          <h2 className="font-display font-extrabold text-4xl lg:text-5xl text-cloud-dark mb-4">Choose Your Plan</h2>
          <p className="text-gray-600">Flexible pricing for individuals and teams. Upgrade or downgrade anytime.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div key={i} className={`relative bg-white rounded-2xl p-8 ${plan.popular ? 'shadow-xl scale-105 border-2 border-cloud-blue' : 'shadow-card'}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-cloud-blue text-white border-0 px-4 py-1">Most Popular</Badge>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="font-display font-bold text-xl text-cloud-dark mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-display font-extrabold text-4xl text-cloud-dark">{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, fi) => (
                  <li key={fi} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className={`w-full rounded-full h-12 font-semibold ${plan.popular ? 'bg-cloud-blue hover:bg-cloud-blue/90 text-white' : 'bg-gray-100 hover:bg-gray-200 text-cloud-dark'}`}>
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection() {
  const faqs = [
    { q: 'What platforms does CloudDrive support?', a: 'CloudDrive currently supports YouTube (for videos), Telegram (via private channels), and GitHub (for code and files). We\'re constantly adding new integrations based on user feedback.' },
    { q: 'Is my data secure?', a: 'Absolutely. We use end-to-end encryption for all file transfers and storage. Your files are stored on your connected platforms, and we only maintain an index for easy access. We never store your actual file contents.' },
    { q: 'Can I cancel my subscription anytime?', a: 'Yes, you can cancel your subscription at any time. Your files will remain accessible, but you\'ll be downgraded to the free plan limits.' },
    { q: 'How does the free trial work?', a: 'You get 14 days of full Pro features without any credit card required. At the end of the trial, you can choose to upgrade or continue with our free plan.' },
    { q: 'Do you offer refunds?', a: 'Yes, we offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied, contact our support team for a full refund.' },
    { q: 'Can I upgrade or downgrade my plan?', a: 'Yes, you can change your plan at any time. Upgrades take effect immediately, and downgrades take effect at the end of your billing cycle.' },
  ];

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Badge className="bg-cloud-blue/10 text-cloud-blue border-0 mb-4">FAQ</Badge>
            <h2 className="font-display font-extrabold text-4xl text-cloud-dark mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Everything you need to know about CloudDrive</p>
          </div>

          <div className="lg:col-span-3">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border rounded-xl px-6 data-[state=open]:border-cloud-blue">
                  <AccordionTrigger className="text-left font-display font-semibold text-cloud-dark hover:no-underline py-4">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-cloud-dark text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cloud-blue to-cloud-purple rounded-xl flex items-center justify-center">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <span className="font-display font-bold text-xl">CloudDrive</span>
            </div>
            <p className="text-gray-400 mb-6">Your files, everywhere. Unified cloud storage for the modern age.</p>
            <div className="flex gap-4">
              <Input placeholder="Enter your email" className="bg-white/10 border-0 text-white placeholder:text-gray-500" />
              <Button className="bg-cloud-blue hover:bg-cloud-blue/90">Subscribe</Button>
            </div>
          </div>

          {[
            { title: 'Product', links: ['Features', 'Pricing', 'Integrations', 'API'] },
            { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
            { title: 'Resources', links: ['Help Center', 'Documentation', 'Community'] },
          ].map((col, i) => (
            <div key={i}>
              <h4 className="font-display font-semibold mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link, li) => (
                  <li key={li}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">© 2024 CloudDrive. All rights reserved.</p>
          <div className="flex gap-6">
            {['Twitter', 'GitHub', 'LinkedIn', 'Discord'].map((social) => (
              <a key={social} href="#" className="text-gray-400 hover:text-white transition-colors text-sm">{social}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// Dashboard Component
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  const filteredFiles = mockFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFolder = selectedFolder ? file.folder === mockFolders.find(f => f.id === selectedFolder)?.name : true;
    const matchesTab = activeTab === 'all' ? true : file.platform === activeTab;
    return matchesSearch && matchesFolder && matchesTab;
  });

  const handleShare = (file: FileItem) => {
    setSelectedFile(file);
    setShareDialogOpen(true);
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(`https://clouddrive.app/s/${selectedFile?.id}`);
    toast.success('Share link copied to clipboard!');
    setShareDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="flex items-center justify-between h-16 px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cloud-blue to-cloud-purple rounded-lg flex items-center justify-center">
                <Cloud className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-lg hidden sm:block">CloudDrive</span>
            </div>
            <div className="hidden md:flex items-center gap-2 ml-8">
              <Button variant="ghost" size="sm" className="gap-2">
                <Home className="w-4 h-4" />
                Home
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <Folder className="w-4 h-4" />
                My Files
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <Share2 className="w-4 h-4" />
                Shared
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="Search files..." 
                className="pl-10 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cloud-blue to-cloud-purple" />
                  <span className="hidden sm:block">Kevin</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={onLogout} className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-[calc(100vh-64px)] hidden lg:block">
          <div className="p-4">
            <Button onClick={() => setUploadDialogOpen(true)} className="w-full bg-cloud-blue hover:bg-cloud-blue/90 text-white gap-2">
              <Plus className="w-4 h-4" />
              New Upload
            </Button>
          </div>

          <div className="px-4 py-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Platforms</p>
            <div className="space-y-1">
              {[
                { id: 'all', label: 'All Files', icon: HardDrive },
                { id: 'telegram', label: 'Telegram', icon: MessageCircle },
                { id: 'youtube', label: 'YouTube', icon: Youtube },
                { id: 'github', label: 'GitHub', icon: Github },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === item.id ? 'bg-cloud-blue/10 text-cloud-blue' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="px-4 py-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Folders</p>
            <div className="space-y-1">
              {mockFolders.map((folder) => (
                <button
                  key={folder.id}
                  onClick={() => setSelectedFolder(selectedFolder === folder.id ? null : folder.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedFolder === folder.id ? 'bg-cloud-blue/10 text-cloud-blue' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Folder className="w-4 h-4" />
                    {folder.name}
                  </div>
                  <span className="text-xs text-gray-400">{folder.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 mt-auto">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Storage</span>
                <span className="text-sm text-gray-500">45%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                <div className="h-full w-[45%] bg-gradient-to-r from-cloud-blue to-cloud-purple rounded-full" />
              </div>
              <p className="text-xs text-gray-500">45.2 GB of 100 GB used</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-display font-bold text-2xl text-cloud-dark">
                {selectedFolder ? mockFolders.find(f => f.id === selectedFolder)?.name : 'All Files'}
              </h1>
              <p className="text-sm text-gray-500">{filteredFiles.length} files</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'bg-gray-100' : ''}>
                <Grid className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'bg-gray-100' : ''}>
                <ListIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredFiles.map((file) => (
                <div key={file.id} className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <FileIcon type={file.type} />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleShare(file)}>
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <h3 className="font-medium text-gray-800 truncate mb-1">{file.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{file.size}</span>
                    <span>•</span>
                    <span>{file.date}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <PlatformBadge platform={file.platform} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Platform</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Size</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFiles.map((file) => (
                    <tr key={file.id} className="border-t hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <FileIcon type={file.type} />
                          <span className="font-medium text-gray-800">{file.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <PlatformBadge platform={file.platform} />
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{file.size}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{file.date}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleShare(file)}>
                            <Share2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Files</DialogTitle>
            <DialogDescription>Choose where to upload your files</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <button className="p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-cloud-blue hover:bg-cloud-blue/5 transition-colors text-center">
              <Upload className="w-8 h-8 mx-auto mb-3 text-gray-400" />
              <p className="font-medium text-gray-700">Local Upload</p>
              <p className="text-sm text-gray-500 mt-1">Drag & drop files</p>
            </button>
            <button className="p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-cloud-blue hover:bg-cloud-blue/5 transition-colors text-center">
              <Link className="w-8 h-8 mx-auto mb-3 text-gray-400" />
              <p className="font-medium text-gray-700">From URL</p>
              <p className="text-sm text-gray-500 mt-1">Import from link</p>
            </button>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-3">Import from Platform</p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-3">
                <MessageCircle className="w-5 h-5 text-blue-500" />
                Import from Telegram
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <Youtube className="w-5 h-5 text-red-500" />
                Import from YouTube
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <Github className="w-5 h-5 text-gray-800" />
                Import from GitHub
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share File</DialogTitle>
            <DialogDescription>Generate a shareable link for {selectedFile?.name}</DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Input value={`https://clouddrive.app/s/${selectedFile?.id}`} readOnly className="bg-transparent border-0" />
              <Button size="icon" variant="ghost" onClick={copyShareLink}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <div className="mt-4 space-y-3">
              <p className="text-sm font-medium text-gray-700">Sharing Options</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Allow downloads</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Set expiration</span>
                <input type="checkbox" className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Password protect</span>
                <input type="checkbox" className="rounded" />
              </div>
            </div>
            <Button className="w-full mt-6 bg-cloud-blue hover:bg-cloud-blue/90" onClick={copyShareLink}>
              <ExternalLink className="w-4 h-4 mr-2" />
              Copy Share Link
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Platform Badge Helper
function PlatformBadge({ platform }: { platform: string }) {
  const configs: Record<string, { color: string; icon: React.ElementType; label: string }> = {
    telegram: { color: 'bg-blue-100 text-blue-700', icon: MessageCircle, label: 'Telegram' },
    youtube: { color: 'bg-red-100 text-red-700', icon: Youtube, label: 'YouTube' },
    github: { color: 'bg-gray-100 text-gray-700', icon: Github, label: 'GitHub' },
    local: { color: 'bg-green-100 text-green-700', icon: HardDrive, label: 'Local' },
  };
  
  const config = configs[platform] || configs.local;
  const Icon = config.icon;
  
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
}

// Main App
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleGetStarted = () => {
    setIsLoggedIn(true);
    setShowDashboard(true);
    toast.success('Welcome to CloudDrive!');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowDashboard(false);
    toast.success('Logged out successfully');
  };

  if (showDashboard) {
    return (
      <>
        <Dashboard onLogout={handleLogout} />
        <Toaster />
      </>
    );
  }

  return (
    <>
      <Navigation onGetStarted={handleGetStarted} isLoggedIn={isLoggedIn} />
      <main>
        <HeroSection onGetStarted={handleGetStarted} />
        <FeaturesSection />
        <HowItWorksSection />
        <CTASection onGetStarted={handleGetStarted} />
        <PricingSection />
        <FAQSection />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
