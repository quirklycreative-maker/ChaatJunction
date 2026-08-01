"use client";
import {useEffect,useState} from "react";

type Branch="hamdan"|"madinat";
const sharedLinks={careem:"https://link.careem.com/YM0pJLSePKfsl",keeta:"https://url-eu.mykeeta.com/BbPW5tuz"};
const links={
 hamdan:{
  talabat:"https://www.talabat.com/uae/restaurant/688663/chaat-junction-al-markaziyah",
  noon:"https://food.noon.com/outlet/CHTJNCYFPR/",
  zomato:"https://www.zomato.com/abudhabi/chaat-junction-restaurant-al-markaziya",
  deliveroo:"https://deliveroo.ae/en/menu/abu-dhabi/al-danah/chaat-junction-hamdan"
 },
 madinat:{
  talabat:"https://www.talabat.com/uae/restaurant/693643/chaat-junction-madinat-zayed",
  noon:"https://food.noon.com/outlet/CHTJNCYMJJ/",
  zomato:"https://www.zomato.com/abudhabi/chaat-junction-1-madinat-zayed",
  deliveroo:null
 }
};

export function OrderLauncher({label="Order online",className="",initialBranch="hamdan"}:{label?:string,className?:string,initialBranch?:Branch}){
 const [open,setOpen]=useState(false); const [branch,setBranch]=useState<Branch>(initialBranch);
 useEffect(()=>{if(!open)return;const close=(e:KeyboardEvent)=>{if(e.key==="Escape")setOpen(false)};document.addEventListener("keydown",close);return()=>document.removeEventListener("keydown",close)},[open]);
 return <><button type="button" className={className} onClick={()=>{setBranch(initialBranch);setOpen(true)}}>{label}</button>{open&&<div className="orderOverlay" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setOpen(false)}}><section className="orderModal" role="dialog" aria-modal="true" aria-labelledby="order-title"><button className="modalClose" onClick={()=>setOpen(false)} aria-label="Close ordering options">×</button><p className="kicker">Order Chaat Junction</p><h2 id="order-title">Choose your delivery app.</h2><div className="modalBranches" role="group" aria-label="Choose branch"><button className={branch==="hamdan"?"active":""} onClick={()=>setBranch("hamdan")}>Hamdan Street</button><button className={branch==="madinat"?"active":""} onClick={()=>setBranch("madinat")}>Madinat Zayed</button></div><div className="deliveryGrid"><a className="deliveryTile talabat" href={links[branch].talabat} target="_blank" rel="noreferrer"><span className="platformLogo">talabat</span><small>Open Chaat Junction ↗</small></a><a className="deliveryTile noon" href={links[branch].noon} target="_blank" rel="noreferrer"><span className="platformLogo">noon <b>Food</b></span><small>Open Chaat Junction ↗</small></a><a className="deliveryTile zomato" href={links[branch].zomato} target="_blank" rel="noreferrer"><span className="platformLogo">zomato</span><small>Open Chaat Junction ↗</small></a><a className="deliveryTile careem" href={sharedLinks.careem} target="_blank" rel="noreferrer"><span className="platformLogo">Careem</span><small>Open restaurant ↗</small></a><a className="deliveryTile keeta" href={sharedLinks.keeta} target="_blank" rel="noreferrer"><span className="platformLogo">Keeta</span><small>Open restaurant ↗</small></a>{links[branch].deliveroo?<a className="deliveryTile deliveroo" href={links[branch].deliveroo} target="_blank" rel="noreferrer"><span className="platformLogo">Deliveroo</span><small>Open Hamdan branch ↗</small></a>:<div className="deliveryTile deliveroo unavailable"><span className="platformLogo">Deliveroo</span><small>Hamdan listing only</small></div>}</div><p className="orderFootnote">Careem and Keeta use shared restaurant links and may select a branch based on your delivery location. Availability, delivery area and prices are controlled by each platform.</p></section></div>}</>
}
