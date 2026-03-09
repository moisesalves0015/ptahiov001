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
    address: storeInfo?.address || 'Consulte nosso endereço',
    phone: storeInfo?.phone || '(00) 00000-0000',
    website: storeInfo?.website || '',
  };

  const date = new Date().toLocaleDateString('pt-BR');
  const validUntil = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR');

  // 2 destaques grandes + resto na grade 4×
  const featured = products.slice(0, 2);
  const grid     = products.slice(2);

  const featuredCards = featured.map(p => `
    <div class="fc">
      <div class="fc-badge">SUPER OFERTA</div>
      <div class="fc-img">
        <img src="${p.image}" alt="${p.name}"
          onerror="this.parentElement.innerHTML='<div class=ph>📦</div>'" />
      </div>
      <div class="fc-body">
        <h3 class="fc-name">${p.name}</h3>
        <div class="fc-price-wrap">
          <div class="fc-label">À vista</div>
          <div class="fc-price">R$ ${p.price.toFixed(2).replace('.',',')}</div>
          <div class="fc-inst">ou 10× de R$ ${(p.price/10).toFixed(2).replace('.',',')} sem juros</div>
        </div>
      </div>
    </div>`).join('');

  const gridCards = grid.map(p => `
    <div class="gc">
      <div class="gc-img">
        <img src="${p.image}" alt="${p.name}"
          onerror="this.parentElement.innerHTML='<div class=ph-sm>📦</div>'" />
      </div>
      <div class="gc-body">
        <p class="gc-name">${p.name.length > 32 ? p.name.slice(0,30)+'…' : p.name}</p>
        <div class="gc-price">R$ ${p.price.toFixed(2).replace('.',',')}</div>
        <div class="gc-inst">10× R$ ${(p.price/10).toFixed(2).replace('.',',')}</div>
      </div>
    </div>`).join('');

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8"/>
<title>Encarte — ${info.name}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:Arial,Helvetica,sans-serif;background:#e5e7eb;}

/* PAGE */
.page{width:210mm;margin:0 auto;background:#fff;overflow:hidden;}

/* ── TOPO ────────────────────────────── */
.hd{
  background:linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%);
  display:flex;align-items:center;justify-content:space-between;
  padding:18px 24px 14px;
}
.hd-left{}
.store-name{
  font-size:40px;font-weight:900;color:#fff;
  letter-spacing:-1px;text-transform:uppercase;line-height:1;
}
.store-sub{
  font-size:10px;font-weight:700;color:#f59e0b;
  letter-spacing:3px;text-transform:uppercase;margin-top:4px;
}
.hd-right{text-align:right;}
.hd-phone{font-size:20px;font-weight:900;color:#f59e0b;letter-spacing:.5px;}
.hd-tel-label{font-size:9px;color:#94a3b8;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:2px;}
.hd-addr{font-size:10px;color:#94a3b8;margin-top:4px;}
.hd-web{font-size:10px;color:#60a5fa;margin-top:2px;}

/* Banner hero */
.hero{
  background:linear-gradient(90deg,#dc2626 0%,#ea580c 100%);
  display:flex;align-items:center;justify-content:space-between;
  padding:14px 24px;
}
.hero-txt{
  font-size:30px;font-weight:900;color:#fff;line-height:1.15;
  text-shadow:0 2px 6px rgba(0,0,0,.3);
}
.hero-txt em{color:#fef08a;font-style:normal;}
.hero-badge{
  background:#fff;border-radius:10px;
  padding:10px 18px;text-align:center;min-width:110px;
}
.hb-top{font-size:8px;font-weight:700;color:#64748b;letter-spacing:2px;text-transform:uppercase;}
.hb-val{font-size:30px;font-weight:900;color:#dc2626;line-height:1;}
.hb-bot{font-size:8px;font-weight:700;color:#64748b;letter-spacing:1px;}

/* Barra validade */
.vbar{
  background:#1e293b;
  display:flex;justify-content:space-between;align-items:center;
  padding:6px 24px;font-size:10px;font-weight:700;
  color:#64748b;letter-spacing:.5px;text-transform:uppercase;
}
.vbar span{color:#f59e0b;}

/* ── SEÇÕES ───────────────────────────── */
.sec{padding:14px 18px;}
.sec-hd{display:flex;align-items:center;gap:10px;margin-bottom:11px;}
.sec-tag{
  display:flex;align-items:center;gap:6px;
  background:#dc2626;color:#fff;
  font-size:9px;font-weight:900;letter-spacing:2px;text-transform:uppercase;
  padding:4px 14px;border-radius:20px;white-space:nowrap;
}
.sec-tag.blue{background:#1e3a5f;}
.sec-line{flex:1;height:2px;background:#e2e8f0;}

/* ── CARDS DESTAQUE ─────────────────── */
.feat-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.fc{
  border:2px solid #fef3c7;border-radius:12px;overflow:hidden;
  background:#fff;position:relative;display:flex;flex-direction:column;
  box-shadow:0 4px 12px rgba(0,0,0,.07);
}
.fc-badge{
  position:absolute;top:10px;left:10px;
  background:#dc2626;color:#fff;
  font-size:8px;font-weight:900;letter-spacing:1.5px;text-transform:uppercase;
  padding:3px 10px;border-radius:20px;z-index:2;
}
.fc-img{width:100%;height:165px;overflow:hidden;background:#f8fafc;display:flex;align-items:center;justify-content:center;}
.fc-img img{width:100%;height:100%;object-fit:cover;}
.ph{font-size:48px;text-align:center;}
.fc-body{padding:12px 14px 14px;}
.fc-name{font-size:15px;font-weight:700;color:#0f172a;line-height:1.3;margin-bottom:9px;}
.fc-price-wrap{background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:9px 12px;}
.fc-label{font-size:8px;font-weight:700;color:#16a34a;text-transform:uppercase;letter-spacing:1px;}
.fc-price{font-size:26px;font-weight:900;color:#15803d;line-height:1.1;}
.fc-inst{font-size:9px;color:#64748b;margin-top:3px;}

/* ── GRADE 4 COLUNAS ────────────────── */
.prod-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;}
.gc{
  border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;
  background:#fff;box-shadow:0 2px 6px rgba(0,0,0,.04);
}
.gc-img{width:100%;height:95px;overflow:hidden;background:#f8fafc;display:flex;align-items:center;justify-content:center;}
.gc-img img{width:100%;height:100%;object-fit:cover;}
.ph-sm{font-size:28px;text-align:center;}
.gc-body{padding:7px 8px 10px;}
.gc-name{font-size:10px;font-weight:700;color:#1e293b;line-height:1.3;margin-bottom:5px;min-height:28px;}
.gc-price{font-size:17px;font-weight:900;color:#15803d;}
.gc-inst{font-size:8px;color:#94a3b8;margin-top:2px;}

/* ── RODAPÉ ─────────────────────────── */
.footer{
  background:#0f172a;
  display:grid;grid-template-columns:auto 1fr auto;
  align-items:center;gap:20px;padding:14px 24px;
}
.ft-delivery{display:flex;align-items:center;gap:10px;}
.ft-del-icon{font-size:28px;}
.ft-del-info{}
.ft-del-title{font-size:12px;font-weight:900;color:#f59e0b;line-height:1;}
.ft-del-sub{font-size:9px;color:#64748b;margin-top:2px;}
.ft-center{text-align:center;}
.ft-center-label{font-size:9px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:1px;}
.ft-center-phone{font-size:20px;font-weight:900;color:#f59e0b;}
.ft-center-addr{font-size:9px;color:#475569;margin-top:3px;}
.ft-right{text-align:right;}
.ft-web{font-size:10px;color:#60a5fa;font-weight:700;}
.ft-valid{font-size:9px;color:#475569;margin-top:4px;}

.powered{
  background:#020617;color:#1e293b;
  text-align:center;padding:5px;
  font-size:8px;letter-spacing:1px;
}
.powered b{color:#334155;}

@media print{
  html,body{margin:0;padding:0;background:#fff;}
  .page{width:100%;box-shadow:none;}
  *{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;}
  @page{margin:0;size:A4 portrait;}
}
</style>
</head>
<body>
<div class="page">

  <!-- TOPO -->
  <div class="hd">
    <div class="hd-left">
      <div class="store-name">${info.name}</div>
      <div class="store-sub">Materiais de Construção</div>
    </div>
    <div class="hd-right">
      <div class="hd-tel-label">Telefone</div>
      <div class="hd-phone">📞 ${info.phone}</div>
      <div class="hd-addr">📍 ${info.address}</div>
      ${info.website ? `<div class="hd-web">🌐 ${info.website}</div>` : ''}
    </div>
  </div>

  <!-- HERO -->
  <div class="hero">
    <div class="hero-txt">Tudo para sua<br>obra com <em>super&nbsp;descontos!</em></div>
    <div class="hero-badge">
      <div class="hb-top">Parcele em até</div>
      <div class="hb-val">10×</div>
      <div class="hb-bot">SEM JUROS NOS CARTÕES</div>
    </div>
  </div>

  <!-- VALIDADE -->
  <div class="vbar">
    <span>Ofertas válidas de <span>${date}</span> até <span>${validUntil}</span></span>
    <span>⚡ Enquanto durar o estoque</span>
  </div>

  ${featured.length > 0 ? `
  <!-- DESTAQUES -->
  <div class="sec">
    <div class="sec-hd">
      <div class="sec-tag">⭐ Produtos em Destaque</div>
      <div class="sec-line"></div>
    </div>
    <div class="feat-grid">${featuredCards}</div>
  </div>` : ''}

  ${grid.length > 0 ? `
  <!-- GRADE -->
  <div class="sec">
    <div class="sec-hd">
      <div class="sec-tag blue">🏷️ Confira Todas as Ofertas</div>
      <div class="sec-line"></div>
    </div>
    <div class="prod-grid">${gridCards}</div>
  </div>` : ''}

  <!-- RODAPÉ -->
  <div class="footer">
    <div class="ft-delivery">
      <div class="ft-del-icon">🚚</div>
      <div class="ft-del-info">
        <div class="ft-del-title">DELIVERY</div>
        <div class="ft-del-sub">Compre e receba em casa!</div>
      </div>
    </div>
    <div class="ft-center">
      <div class="ft-center-label">Fale Conosco</div>
      <div class="ft-center-phone">${info.phone}</div>
      <div class="ft-center-addr">${info.address}</div>
    </div>
    <div class="ft-right">
      ${info.website ? `<div class="ft-web">${info.website}</div>` : ''}
      <div class="ft-valid">Válido até ${validUntil}</div>
    </div>
  </div>

  <div class="powered">Gerado por <b>ptah.io</b></div>

</div>
<script>
window.addEventListener('load',function(){setTimeout(function(){window.print();},700);});
</script>
</body>
</html>`;

  const win = window.open('', '_blank', 'width=920,height=1100');
  if (!win) { alert('Permita popups neste site para gerar o encarte!'); return; }
  win.document.open();
  win.document.write(html);
  win.document.close();
};
