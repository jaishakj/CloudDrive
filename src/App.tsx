import type { ElementType } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, Database, Globe, Layers, Lock, Send, Server, Shield, Upload } from 'lucide-react';
import './App.css';

const uploadFlow = [
  'User selects file in web UI',
  'Frontend splits into ~1.8GB chunks',
  'Chunks posted to /upload/chunk endpoints',
  'Backend uploads each chunk to private Telegram channel',
  'Telegram file IDs + metadata stored in PostgreSQL',
  'Share token generated for /share/<uuid> download',
];

const downloadFlow = [
  'User opens /share/<uuid> link',
  'Backend resolves file + chunk metadata from PostgreSQL',
  'Chunk file IDs fetched from Telegram in order',
  'Chunks streamed sequentially through FastAPI response',
  'Download counter and analytics updated',
];

const architectureBlocks = [
  {
    title: 'Backend',
    icon: Server,
    stack: 'FastAPI + SQLAlchemy (async) + PostgreSQL + Redis',
    notes: 'OAuth2/JWT auth, rate limiting, Telegram + GitHub storage services',
  },
  {
    title: 'Frontend',
    icon: Globe,
    stack: 'Next.js App Router + Tailwind + shadcn/ui',
    notes: 'Chunked upload UX, file browser, share links, auth screens',
  },
  {
    title: 'Storage Layer',
    icon: Layers,
    stack: 'Telegram private channel (primary) + GitHub releases (small-file fallback)',
    notes: 'Telegram stores binary chunks, GitHub stores optional metadata/small assets',
  },
  {
    title: 'Security',
    icon: Shield,
    stack: 'JWT, CORS, MIME validation, quota checks, optional encryption',
    notes: 'Public links can support expiry and password-protection',
  },
];

const schema = `users(id, email, password_hash, storage_used, storage_limit, created_at)
files(id, user_id, filename, mime_type, total_size, chunk_count, share_token, is_public)
chunks(id, file_id, chunk_index, telegram_file_id, telegram_message_id, chunk_size)
github_files(id, file_id, repo_url, release_tag, asset_id, download_url)`;

const folderLayout = `backend/
  app/main.py
  app/config.py
  app/database.py
  app/models/{user,file,chunk}.py
  app/api/{auth,upload,files,share,telegram}.py
  app/services/{telegram,storage,github}.py
  app/utils/{auth,chunking,rate_limit}.py
frontend/
  app/{upload,files,share,auth}/
  components/{FileUploader,FileList,ShareDialog,StorageQuota}.tsx`;

function SectionList({ title, items, icon: Icon }: { title: string; items: string[]; icon: ElementType }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Icon className="w-5 h-5 text-cloud-blue" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-2 text-sm text-gray-700">
            <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-600" />
            <span>{item}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default function App() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">
        <header className="space-y-4">
          <Badge className="bg-cloud-blue/10 text-cloud-blue border-0">CloudDrive Blueprint</Badge>
          <h1 className="text-4xl font-bold tracking-tight">Multi-platform cloud storage (Telegram + GitHub)</h1>
          <p className="text-gray-600 max-w-3xl">
            Production-oriented architecture for chunked uploads, Telegram-backed blob storage, PostgreSQL metadata,
            Redis throttling, and shareable public links via FastAPI + Next.js.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {architectureBlocks.map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <item.icon className="w-5 h-5 text-cloud-blue" />
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium text-sm">{item.stack}</p>
                <p className="text-sm text-gray-600 mt-2">{item.notes}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <SectionList title="Upload Flow" items={uploadFlow} icon={Upload} />
          <SectionList title="Download Flow" items={downloadFlow} icon={Send} />
        </section>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Database className="w-5 h-5 text-cloud-blue" />Data Schema</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="rounded-lg bg-slate-900 text-slate-100 p-4 text-xs overflow-auto">{schema}</pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Lock className="w-5 h-5 text-cloud-blue" />Project Layout</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="rounded-lg bg-slate-900 text-slate-100 p-4 text-xs overflow-auto">{folderLayout}</pre>
            <Separator className="my-4" />
            <p className="text-sm text-gray-600">Deploy backend + self-hosted Telegram Bot API in one Docker network for lower latency and large-file support.</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
