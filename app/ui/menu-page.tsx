/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Variant } from "./concept-home";
import {MenuExperience} from "./menu-experience";
import {OrderLauncher} from "./order-modal";

const groups=[
 {title:"Chaat Corner",note:"Crunchy, tangy, spicy, sweet",items:["Pani Puri","Bhel Puri","Sev Puri","Dahi Puri","Papdi Chaat","Samosa Chaat","Katori Chaat","Ragda Pattice"]},
 {title:"Mumbai Favourites",note:"The comfort-food classics",items:["Vada Pav","Butter Pav Bhaji","Cheese Pav Bhaji","Misal Pav","Dabeli","Puri Bhaji"]},
 {title:"Breakfast & South Indian",note:"Start bright, stay satisfied",items:["Poha","Idli Sambar","Masala Dosa","Jini Dosa","Aloo Paratha","Gobi Paratha"]},
 {title:"Sandwiches & Quick Bites",note:"Grilled, loaded and ready",items:["Veg Cheese Grill","Schezwan Veg Cheese Grill","Chaat Junction Special Sandwich","Onion Kachori","Bread Pakoda","Paneer Pakoda"]},
 {title:"Meals & Thalis",note:"A little bit of everything",items:["Veg Thali","Chole Bhature","Rajma Chawal","Kadhi Chawal","Paneer Meal","Dal Khichdi"]},
 {title:"Desserts & Drinks",note:"Cool down or sweeten the day",items:["Falooda","Mango Shake","Fresh Juices","Sweet Lassi","Masala Chai","Ice Gola"]}
];
const signatures=[
 {name:"Pani Puri",note:"Crisp · tangy · unmistakably chaat",image:"/dishes/pani-puri.png",group:"Chaat Corner"},
 {name:"Papdi Chaat",note:"Yogurt, chutneys, sev & pomegranate",image:"/dishes/papdi-chaat.png",group:"Chaat Corner"},
 {name:"Pav Bhaji",note:"Buttery Mumbai comfort with toasted pav",image:"/dishes/pav-bhaji.png",group:"Mumbai Favourites"},
 {name:"Masala Dosa",note:"Golden, crisp, with sambar & chutneys",image:"/dishes/dosa.png",group:"South Indian"}
];
const routes:Record<Variant,string>={spice:"",joy:"/joy",heritage:"/heritage",chatore:"/chatore"};
const branchMenus=[
 {name:"Madinat Zayed",pages:11,source:"https://www.zomato.com/abudhabi/chaat-junction-1-madinat-zayed/menu",folder:"madinat"},
 {name:"Hamdan / Al Markaziya",pages:8,source:"https://www.zomato.com/abudhabi/chaat-junction-restaurant-al-markaziya/menu",folder:"hamdan"}
];
export function MenuPage({variant}:{variant:Variant}){
 const home=routes[variant];
 return <main className={`site ${variant} menuPage`}>
  <header><Link className="logo" href={home||"/"}><BrandMark/></Link><nav><a href="#chaat">Chaat</a><a href="#mumbai">Mumbai favourites</a><a href="#meals">Meals</a><a href="#drinks">Drinks</a></nav><OrderLauncher className="order"/><MobileMenuNav home={home||"/"}/></header>
  <section className="menuHero"><p className="eyebrow">Pure vegetarian · Pan-Indian & fusion</p><h1>Come hungry.<br/>Leave delighted.</h1><p>From pani puri and pav bhaji to thalis, dosas, sandwiches, falooda and fresh shakes—find your kind of craving.</p><div className="menuChips">{groups.map((g,i)=><a key={g.title} href={`#${i===0?"chaat":i===1?"mumbai":i===4?"meals":i===5?"drinks":`group-${i}`}`}>{g.title}</a>)}</div></section>
  <section className="signatureMenu"><div className="signatureHead"><p className="kicker">The first round</p><h2>Four reasons to pull up a chair.</h2><p>Start with the signatures, then explore the complete menu by craving.</p></div><div className="signatureGrid">{signatures.map((dish,i)=><article key={dish.name}><div className="signatureImage"><img src={dish.image} alt={dish.name}/><span>0{i+1}</span></div><small>{dish.group}</small><h3>{dish.name}</h3><p>{dish.note}</p><a href={i<2?"#chaat":i===2?"#mumbai":"#group-2"}>Explore category ↘</a></article>)}</div></section>
  <MenuExperience/>
  <section className="originalMenu"><details className="scanArchive"><summary><span>View original menu scans</span><small>19 pages · two branches</small></summary><div className="originalMenuHead"><div><p className="kicker">Original listings</p><h2>Branch menu archive</h2></div><p>Open a branch only when you need to compare the original public menu artwork.</p></div>{branchMenus.map(branch=><details key={branch.name}><summary><span>{branch.name}</span><small>{branch.pages} pages</small></summary><div className="menuScans">{Array.from({length:branch.pages},(_,i)=><figure key={i}><img loading="lazy" src={`/menu/${branch.folder}/${String(i+1).padStart(2,"0")}.jpg`} alt={`${branch.name} menu page ${i+1} of ${branch.pages}`}/><figcaption>Page {i+1} of {branch.pages}</figcaption></figure>)}</div><a className="menuSource" href={branch.source} target="_blank" rel="noreferrer">View source listing on Zomato ↗</a></details>)}</details></section>
  <footer><Link className="logo" href={home||"/"}><BrandMark/></Link><p>Pure vegetarian Indian street food in Abu Dhabi.<br/><span className="conceptCredit">Independent website concept by Quirkly.life</span></p><div><Link href={home||"/"}>Back to homepage</Link><a href="https://chatorerestaurant.com/" target="_blank" rel="noreferrer">Other Brands: Chatore ↗</a></div></footer>
 </main>
}
function BrandMark(){return <span className="brandMark"><i><b>C</b><b>J</b></i><span><span className="brandName"><strong>Chaat Junction</strong><span className="vegMark" role="img" aria-label="Pure vegetarian"><span/></span></span><small>Abu Dhabi</small></span></span>}
function MobileMenuNav({home}:{home:string}){return <details className="mobileNav"><summary aria-label="Open navigation">☰</summary><div><a href="#chaat">Chaat</a><a href="#mumbai">Mumbai favourites</a><Link href={`${home}#locations`}>Locations</Link><OrderLauncher label="Order online"/></div></details>}
