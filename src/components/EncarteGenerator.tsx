import { Product } from '../types';

interface StoreInfo {
  name: string;
  address?: string;
  phone?: string;
  website?: string;
}

export const generateEncartePDF = (products: Product[], storeName: string, storeInfo?: Partial<StoreInfo>) => {
  const info: StoreInfo = {
    name: storeName,
    address: storeInfo?.address || 'Av. das Nações, 1250 — Centro, São Paulo/SP',
    phone: storeInfo?.phone || '(11) 98765-4321',
    website: storeInfo?.website || 'www.obrabase.com.br',
  };

  const date = new Date().toLocaleDateString('pt-BR');
  const validUntil = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR');

  // 3 destaques + resto na grade 4×
  const featured = products.slice(0, 3);
  const grid = products.slice(3);

  /* ── SVGs inline (Lucide) ── */
  const iconPhone   = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.75 19.75 0 0 1 1.08 3.18 2 2 0 0 1 3.05 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 16z"/></svg>`;
  const iconMapPin  = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;
  const iconGlobe   = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;
  const iconTruck   = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/><rect width="9" height="11" x="11" y="11" rx="1"/><circle cx="17.5" cy="17.5" r="2.5"/><circle cx="6.5" cy="17.5" r="2.5"/></svg>`;
  const iconStar    = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
  const iconTag     = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2 2 0 0 0 2.828 0l6.168-6.168a2 2 0 0 0 0-2.828Z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>`;

  const featuredCards = featured.map(p => `
    <div class="fc">
      <div class="fc-img-wrap">
        <img class="fc-img" src="${p.image}" alt="${p.name}"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />
        <div class="fc-fallback">📦</div>
        <div class="fc-gradient"></div>
        <div class="fc-top-badge">${iconStar} DESTAQUE</div>
        <h3 class="fc-name">${p.name.length > 28 ? p.name.slice(0, 26) + '…' : p.name}</h3>
      </div>
      <!-- Price badge flutua no canto inferior-direito -->
      <div class="fc-price-badge">
        <div class="fpb-label">${iconTag} À VISTA</div>
        <div class="fpb-value">R$<br>${p.price.toFixed(2).replace('.', ',')}</div>
        <div class="fpb-inst">10x R$ ${(p.price / 10).toFixed(2).replace('.', ',')}</div>
      </div>
    </div>`).join('');

  const gridCards = grid.map(p => `
    <div class="gc">
      <div class="gc-img-wrap">
        <img class="gc-img" src="${p.image}" alt="${p.name}"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />
        <div class="gc-fallback">📦</div>
        <div class="gc-gradient"></div>
        <h4 class="gc-name">${p.name.length > 22 ? p.name.slice(0, 20) + '…' : p.name}</h4>
      </div>
      <!-- Price badge flutua no canto inferior-direito -->
      <div class="gc-price-badge">
        <div class="gpb-label">${iconTag} À VISTA</div>
        <div class="gpb-value">R$ ${p.price.toFixed(2).replace('.', ',')}</div>
        <div class="gpb-inst">10x R$ ${(p.price / 10).toFixed(2).replace('.', ',')}</div>
      </div>
    </div>`).join('');

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Encarte — ${info.name}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{
  font-family:'Poppins',sans-serif;
  background:#BFC9D4;
  -webkit-font-smoothing:antialiased;
}

/* ── PAGE ── */
.page{
  width:210mm;
  margin:0 auto;
  background:#F0F4F8;
  box-shadow:0 32px 80px rgba(0,0,0,.22);
}

/* ── HEADER ── */
.header{
  background:linear-gradient(120deg,#111835 0%,#1a244a 45%,#0248C1 100%);
  padding:20px 26px 16px;
  display:flex;justify-content:space-between;align-items:center;
  position:relative;overflow:hidden;
}
.header::after{
  content:'';position:absolute;
  top:-90px;right:-60px;
  width:280px;height:280px;
  background:radial-gradient(circle,rgba(255,183,77,.18) 0%,transparent 65%);
  border-radius:50%;pointer-events:none;
}
.store-brand{position:relative;z-index:1;}
.store-name{
  font-size:40px;font-weight:900;color:#fff;
  letter-spacing:-1.5px;line-height:1;
  text-shadow:0 4px 14px rgba(0,0,0,.5);
}
.store-tagline{
  font-size:9.5px;font-weight:600;color:#F8D613;
  text-transform:uppercase;letter-spacing:4px;margin-top:6px;
}
.header-info{position:relative;z-index:1;text-align:right;}
.h-row{
  display:flex;align-items:center;justify-content:flex-end;
  gap:5px;margin-bottom:4px;
}
.h-row .ico{color:#F8D613;display:flex;}
.h-phone{font-size:18px;font-weight:700;color:#F8D613;}
.h-addr{font-size:10px;color:#93C5FD;line-height:1.35;}
.h-web{font-size:10px;color:#60A5FA;font-weight:500;}

/* ── HERO ── */
.hero{
  background:linear-gradient(100deg,#111835 0%,#0248C1 100%);
  padding:14px 26px;
  display:flex;align-items:center;justify-content:space-between;
  color:#fff;
}
.hero-title{
  font-size:22px;font-weight:800;line-height:1.2;
  text-shadow:0 1px 6px rgba(0,0,0,.2);
}
.hero-title em{
  font-style:normal;
  background:rgba(0,0,0,.18);
  padding:1px 8px;border-radius:5px;
}
.hero-badge{
  background:rgba(255,255,255,.96);
  padding:9px 18px;border-radius:40px;text-align:center;
  box-shadow:0 6px 20px rgba(0,0,0,.25);min-width:108px;
}
.badge-small{font-size:8px;font-weight:700;color:#0248C1;letter-spacing:1px;text-transform:uppercase;}
.badge-large{font-size:34px;font-weight:900;color:#07192B;line-height:1;}
.badge-text{font-size:8px;font-weight:700;color:#555;}

/* ── VALIDITY ── */
.vbar{
  background:#0D2038;
  padding:7px 26px;
  display:flex;justify-content:space-between;align-items:center;
  font-size:10px;font-weight:500;color:#475569;letter-spacing:.3px;
}
.vbar strong{color:#F8D613;font-weight:700;}

/* ── SECTION ── */
.section{padding:16px 20px;}
.sec-hd{
  display:flex;align-items:center;gap:10px;margin-bottom:12px;
}
.sec-tag{
  font-size:11px;font-weight:700;
  padding:3px 13px;border-radius:30px;
  white-space:nowrap;letter-spacing:.3px;
  color:#fff;
}
.sec-tag.red{background:linear-gradient(90deg,#111835,#0248C1);}
.sec-tag.blue{background:linear-gradient(90deg,#0248C1,#111835);}
.sec-line{flex:1;height:1.5px;background:linear-gradient(90deg,#CBD5E1 0%,transparent 100%);}

/* ══ FEATURED CARDS — 3 col ══ */
.feat-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:14px;
}

/* O wrapper precisa de position:relative para o badge flutuar */
.fc{
  position:relative;
  border-radius:14px;
  overflow:visible;          /* permite badge vazar */
  page-break-inside:avoid;break-inside:avoid;
}
.fc-img-wrap{
  border-radius:14px;
  overflow:hidden;
  position:relative;
  height:195px;
  background:#111835;
  box-shadow:0 8px 24px rgba(0,0,0,.18);
}
.fc-img{width:100%;height:100%;object-fit:cover;display:block;}
.fc-fallback{
  display:none;width:100%;height:100%;
  align-items:center;justify-content:center;
  font-size:44px;color:#93C5FD;background:#0D2D4A;
}
.fc-gradient{
  position:absolute;inset:0;
  background:linear-gradient(to top,rgba(7,25,43,.96) 0%,rgba(7,25,43,.5) 42%,transparent 75%);
}
.fc-top-badge{
  position:absolute;top:10px;left:10px;
  display:inline-flex;align-items:center;gap:4px;
  background:linear-gradient(90deg,#111835,#0248C1);
  color:#fff;font-size:8px;font-weight:800;letter-spacing:.8px;
  padding:2px 9px;border-radius:20px;text-transform:uppercase;
}
.fc-name{
  position:absolute;bottom:54px;left:0;right:0;
  padding:0 12px;
  font-size:12.5px;font-weight:700;color:#fff;line-height:1.3;
  text-shadow:0 1px 4px rgba(0,0,0,.6);
}

/* Price badge: flutua fora do card, canto inferior direito */
.fc-price-badge{
  position:absolute;
  bottom:-10px;right:-10px;
  background:linear-gradient(135deg,#111835,#1a244a);
  border:2px solid #F8D613;
  border-radius:12px;
  padding:7px 11px;
  color:#fff;
  box-shadow:0 8px 22px rgba(0,0,0,.35);
  z-index:10;
  min-width:90px;
  text-align:center;
}
.fpb-label{
  display:flex;align-items:center;justify-content:center;gap:3px;
  font-size:7.5px;font-weight:700;color:#F8D613;
  text-transform:uppercase;letter-spacing:1px;margin-bottom:2px;
}
.fpb-value{
  font-size:18px;font-weight:900;color:#ECFDF5;line-height:1.1;
}
.fpb-inst{font-size:8px;color:rgba(255,255,255,.6);margin-top:2px;}

/* ══ GRID CARDS — 4 col ══ */
.grid-grid{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:10px;
}
.gc{
  position:relative;
  border-radius:12px;
  overflow:visible;
  page-break-inside:avoid;break-inside:avoid;
}
.gc-img-wrap{
  border-radius:12px;
  overflow:hidden;
  position:relative;
  height:130px;
  background:#111835;
  box-shadow:0 4px 14px rgba(0,0,0,.16);
}
.gc-img{width:100%;height:100%;object-fit:cover;display:block;}
.gc-fallback{
  display:none;width:100%;height:100%;
  align-items:center;justify-content:center;
  font-size:28px;color:#93C5FD;background:#0D2D4A;
}
.gc-gradient{
  position:absolute;inset:0;
  background:linear-gradient(to top,rgba(7,25,43,.95) 0%,rgba(7,25,43,.4) 50%,transparent 80%);
}
.gc-name{
  position:absolute;bottom:42px;left:0;right:0;
  padding:0 8px;
  font-size:10px;font-weight:600;color:#fff;line-height:1.3;
  text-shadow:0 1px 3px rgba(0,0,0,.7);
}

/* Price badge grid: flutua no canto inferior direito */
.gc-price-badge{
  position:absolute;
  bottom:-9px;right:-9px;
  background:linear-gradient(135deg,#111835,#1a244a);
  border:1.5px solid #F8D613;
  border-radius:9px;
  padding:5px 9px;
  color:#fff;
  box-shadow:0 6px 16px rgba(0,0,0,.3);
  z-index:10;
  min-width:80px;
  text-align:center;
}
.gpb-label{
  display:flex;align-items:center;justify-content:center;gap:3px;
  font-size:6.5px;font-weight:700;color:#F8D613;
  text-transform:uppercase;letter-spacing:.8px;margin-bottom:1px;
}
.gpb-value{font-size:13px;font-weight:900;color:#ECFDF5;line-height:1;}
.gpb-inst{font-size:7px;color:rgba(255,255,255,.55);margin-top:1px;}

/* ── FOOTER ── */
.footer{
  background:linear-gradient(120deg,#111835 0%,#0248C1 100%);
  padding:16px 26px;
  display:grid;grid-template-columns:auto 1fr auto;
  gap:16px;align-items:center;
  margin-top:20px;
  position:relative;overflow:hidden;
}
.footer::before{
  content:'';position:absolute;
  bottom:-70px;left:-40px;
  width:240px;height:240px;
  background:radial-gradient(circle,rgba(245,158,11,.1) 0%,transparent 65%);
  border-radius:50%;pointer-events:none;
}
.ft-delivery{
  display:flex;align-items:center;gap:10px;
  position:relative;z-index:1;
}
.ft-del-ico{
  background:#F8D613;
  width:46px;height:46px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  color:#07192B;flex-shrink:0;
}
.ft-del-info h4{font-size:12px;font-weight:700;color:#F8D613;}
.ft-del-info p{font-size:9.5px;color:#93C5FD;margin-top:1px;}
.ft-center{text-align:center;position:relative;z-index:1;}
.ft-clabel{font-size:9px;font-weight:700;color:#334155;text-transform:uppercase;letter-spacing:1.5px;}
.ft-phone{font-size:20px;font-weight:700;color:#F8D613;margin:2px 0;}
.ft-addr{font-size:9.5px;color:#93C5FD;}
.ft-right{text-align:right;position:relative;z-index:1;}
.ft-web{font-size:10px;color:#F8D613;font-weight:600;margin-bottom:3px;}
.ft-valid{font-size:9px;color:#475569;}

/* ── POWERED ── */
.powered{
  background:#111835;
  color:#F4F4F4;
  text-align:center;padding:6px;
  font-size:8.5px;letter-spacing:1.5px;text-transform:uppercase;
}
.powered strong{color:#F8D613;}

/* ── PRINT ── */
@media print{
  html,body{margin:0;padding:0;background:#fff;}
  .page{width:100%;box-shadow:none;}
  *{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;}
  @page{margin:10mm;size:A4 portrait;}
  .fc,.gc{page-break-inside:avoid;break-inside:avoid;}
  .feat-grid,.grid-grid{page-break-inside:avoid;break-inside:avoid;}
  /* Garante que o badge que vaza não seja cortado */
  .fc,.gc{margin-bottom:14px;}
}
</style>
</head>
<body>
<div class="page">

  <!-- HEADER -->
  <div class="header">
    <div class="store-brand">
      <div class="store-name">${info.name}</div>
      <div class="store-tagline">Materiais de Construção &amp; Ferramentas</div>
    </div>
    <div class="header-info">
      <div class="h-row">
        <span class="ico">${iconPhone}</span>
        <span class="h-phone">${info.phone}</span>
      </div>
      <div class="h-row">
        <span class="ico" style="color:#93C5FD">${iconMapPin}</span>
        <span class="h-addr">${info.address}</span>
      </div>
      <div class="h-row">
        <span class="ico" style="color:#60A5FA">${iconGlobe}</span>
        <span class="h-web">${info.website}</span>
      </div>
    </div>
  </div>

  <!-- HERO -->
  <div class="hero">
    <div class="hero-title">
      Tudo para sua obra com<br><em>os melhores preços!</em>
    </div>
    <div class="hero-badge">
      <div class="badge-small">Parcele em até</div>
      <div class="badge-large">10x</div>
      <div class="badge-text">SEM JUROS</div>
    </div>
  </div>

  <!-- VALIDITY -->
  <div class="vbar">
    <span>📅 <strong>Válido de ${date} até ${validUntil}</strong></span>
    <span>⚡ Enquanto durar o estoque</span>
  </div>

  ${featured.length > 0 ? `
  <!-- DESTAQUES 3 col -->
  <div class="section">
    <div class="sec-hd">
      <span class="sec-tag red">${iconStar} DESTAQUES DA SEMANA</span>
      <div class="sec-line"></div>
    </div>
    <div class="feat-grid">${featuredCards}</div>
  </div>` : ''}

  ${grid.length > 0 ? `
  <!-- PRODUTOS 4 col -->
  <div class="section">
    <div class="sec-hd">
      <span class="sec-tag blue">${iconTag} OFERTAS IMPERDÍVEIS</span>
      <div class="sec-line"></div>
    </div>
    <div class="grid-grid">${gridCards}</div>
  </div>` : ''}

  <!-- FOOTER -->
  <div class="footer">
    <div class="ft-delivery">
      <div class="ft-del-ico">${iconTruck}</div>
      <div class="ft-del-info">
        <h4>FRETE GRÁTIS</h4>
        <p>Nas compras acima de R$ 500,00</p>
      </div>
    </div>
    <div class="ft-center">
      <div class="ft-clabel">Fale Conosco</div>
      <div class="ft-phone">${info.phone}</div>
      <div class="ft-addr">${info.address}</div>
    </div>
    <div class="ft-right">
      <div class="ft-web">${info.website}</div>
      <div class="ft-valid">Válido até ${validUntil}</div>
    </div>
  </div>
  <div class="powered">Gerado por <strong>OBRABASE</strong> — Todos os direitos reservados</div>

</div>
<script>
window.addEventListener('load',function(){setTimeout(function(){window.print();},900);});
</script>
</body>
</html>`;

  const win = window.open('', '_blank', 'width=1200,height=900');
  if (!win) { alert('Permita popups neste site para gerar o encarte!'); return; }
  win.document.open();
  win.document.write(html);
  win.document.close();
};