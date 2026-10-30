import {calculate,formatMoney} from '../domain/ledger.mjs';
import {t,formatDate} from '../locales/i18n.mjs';
export function backup(d){const out=JSON.parse(JSON.stringify(d));out.expenses.forEach(e=>e.evidence=[]);return out;}
export function download(data,name,type){const u=URL.createObjectURL(new Blob([data],{type})),a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),10000);}
// Version/publication arguments remain API-compatible; clean exports deliberately omit that metadata.
export function settlementText(d,_version,_published,lang='en'){
 const s=calculate(d),f=n=>formatMoney(n,d.currency,lang),name=id=>d.members.find(m=>m.id===id).name;
 return [`${t('一起A',lang)} · ${d.title}`,`${t('已确认消费',lang)} ${f(s.total)}`,
 ...s.people.map(p=>lang==='zh'?`${p.name}：承担 ${f(p.share)}，垫付 ${f(p.paid)}，已补 ${f(p.sent)}，已收 ${f(p.received)}`:`${p.name}: share ${f(p.share)}, paid upfront ${f(p.paid)}, sent ${f(p.sent)}, received ${f(p.received)}`),
 t('当前转账建议',lang),...s.routes.map(r=>`${name(r.from)} → ${name(r.to)}: ${f(r.amount)}`),s.routes.length?'':t('已结清',lang)].filter(Boolean).join('\n');
}
export function csvText(d,_version,lang='en'){
 const s=calculate(d),q=v=>'"'+String(v).replace(/^[=+@-]/,"'$&").replaceAll('"','""')+'"';
 const rows=[[t('一起A',lang),d.title,d.currency],['成员','应承担','已垫付','已补款','已收款','待收正/待付负'].map(v=>t(v,lang)),...s.people.map(p=>[p.name,...[p.share,p.paid,p.sent,p.received,p.net].map(n=>(n/100).toFixed(2))]),[],['消费名称','金额','日期'].map(v=>t(v,lang)),...d.expenses.map(e=>[e.title,(e.total/100).toFixed(2),formatDate(e.date,lang)])];
 return '\ufeff'+rows.map(r=>r.map(q).join(',')).join('\r\n');
}
export function exportCSV(d,version,lang='en'){download(csvText(d,version,lang),lang==='zh'?'一起A-结算.csv':'Split-Together-settlement.csv','text/csv;charset=utf-8');}
export function wrapText(text,measure,maxWidth){const lines=[];let line='';for(const token of text.split(/(\s+)/)){if(!token)continue;if(/^\s+$/.test(token)){if(line&&measure(line+token)<=maxWidth)line+=token;continue;}if(measure(line+token)<=maxWidth){line+=token;continue;}if(line.trim()){lines.push(line.trimEnd());line='';}if(measure(token)<=maxWidth){line=token;continue;}for(const ch of token){if(line&&measure(line+ch)>maxWidth){lines.push(line);line='';}line+=ch;}}if(line||!lines.length)lines.push(line.trimEnd());return lines;}
export function exportImage(d,version,published,lang='en'){
 const source=settlementText(d,version,published,lang).split('\n'),c=document.createElement('canvas');c.width=1000;let x=c.getContext('2d');x.font='25px sans-serif';const lines=[];
 source.forEach((line,index)=>wrapText(line,text=>x.measureText(text).width,885).forEach(text=>lines.push({text,index})));
 c.height=210+lines.length*43;x=c.getContext('2d');x.fillStyle='#faf7ef';x.fillRect(0,0,c.width,c.height);x.fillStyle='#174c40';x.font='bold 44px sans-serif';x.fillText(t('结算明细',lang),55,85);x.font='25px sans-serif';lines.forEach((l,i)=>{x.fillStyle=l.index<2?'#668075':'#203d34';x.fillText(l.text,55,150+i*43)});c.toBlob(b=>download(b,lang==='zh'?'一起A-结算.png':'Split-Together-settlement.png','image/png'));
}
