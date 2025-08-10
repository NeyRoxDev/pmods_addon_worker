
(function(){
  function h(tag, props, children){
    var el = document.createElement(tag);
    if (props) Object.keys(props).forEach(function(k){ el.setAttribute(k, props[k]); });
    (children||[]).forEach(function(c){ el.appendChild(typeof c==='string'? document.createTextNode(c) : c); });
    return el;
  }
  function tableOf(rows){
    if (!rows || !rows.length) return h('div', null, ['—']);
    var keys = Object.keys(rows[0]);
    var tbl = h('table', {style:'width:100%;border-collapse:collapse;font-size:12px;'});
    var thead = h('tr', null, keys.map(function(k){ var th=h('th',{style:'text-align:left;border-bottom:1px solid #ccc;padding:6px;'},[k]); return th; }));
    tbl.appendChild(thead);
    rows.forEach(function(r){
      var tr = h('tr', null, keys.map(function(k){ return h('td',{style:'border-bottom:1px solid #eee;padding:6px;'},[String(r[k] ?? '')]); }));
      tbl.appendChild(tr);
    });
    return tbl;
  }
  async function fetchJSON(url){
    const r = await fetch(url, { credentials:'include' });
    return r.json();
  }
  async function main(){
    var root = document.getElementById('pmods-root');
    if (!root) return;
    var serverUuid = root.getAttribute('data-server-uuid') || '';

    var title = h('h2', null, ['PMods v0.6.1 — Dashboard (prebuilt)']);
    var statsBox = h('div', {style:'margin-top:10px;'});
    var instBox = h('div', {style:'margin-top:10px;'});
    var filesBox = h('div', {style:'margin-top:10px;'});
    root.appendChild(title);
    root.appendChild(h('h3', null, ['Statistiques globales']));
    root.appendChild(statsBox);
    root.appendChild(h('h3', null, ['Installés sur ce serveur']));
    root.appendChild(instBox);
    root.appendChild(h('h3', null, ['Explorateur (liste)']));
    root.appendChild(filesBox);

    try{
      var stats = await fetchJSON('/admin/mods/stats');
      statsBox.innerHTML='';
      statsBox.appendChild(h('div',null,['Top Mods/Plugins']));
      statsBox.appendChild(tableOf(stats.top||[]));
      statsBox.appendChild(h('div',null,['Jeux les plus utilisés']));
      statsBox.appendChild(tableOf(stats.games||[]));
      statsBox.appendChild(h('div',null,['Serveurs les plus actifs']));
      statsBox.appendChild(tableOf(stats.servers||[]));
    }catch(e){ statsBox.innerHTML='Erreur de stats.'; }

    try{
      var installed = await fetchJSON('/server/'+serverUuid+'/mods/installed');
      instBox.innerHTML='';
      instBox.appendChild(tableOf(installed.data||[]));
    }catch(e){ instBox.innerHTML='Erreur installés.'; }

    try{
      var listUrl = new URL('/server/'+serverUuid+'/mods/explorer', window.location.origin);
      var files = await fetchJSON(listUrl.toString());
      filesBox.innerHTML='';
      filesBox.appendChild(tableOf(files.files||[]));
    }catch(e){ filesBox.innerHTML='Erreur fichiers.'; }
  }
  main();
})();
