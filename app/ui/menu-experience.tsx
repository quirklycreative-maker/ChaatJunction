"use client";
import {useState} from "react";
import {OrderLauncher} from "./order-modal";

type Branch="hamdan"|"madinat";
const branches={
 hamdan:{label:"Hamdan Street"},
 madinat:{label:"Madinat Zayed"}
};
const categories=[
 {id:"chaat",title:"Chaat Corner",items:[
  ["Pani Puri Aloo Chana","Crisp puris with potato, chickpeas and spiced pani",8,"🌶"],
  ["Bhel Puri","Puffed rice, sev, vegetables and two chutneys",9,"🌶"],
  ["Papdi Chaat","Papdi, yogurt, tamarind, mint and sev",10,"Mild"],
  ["Dahi Bhalla Papdi Chaat","Lentil dumplings, papdi, yogurt and chutneys",11,"Mild"]]},
 {id:"mumbai",title:"Mumbai Favourites",items:[
  ["Vada Pav","Spiced potato vada in a soft pav with chutneys",6,"🌶"],
  ["Butter Pav Bhaji","Buttery vegetable bhaji with toasted pav",16,"🌶"],
  ["Cheese Pav Bhaji","Pav bhaji finished with grated cheese",17,"🌶"],
  ["Chaat Junction Special Pav Bhaji","The house-loaded version of Mumbai’s classic",20,"Bestseller"]]},
 {id:"south-indian",title:"South Indian",items:[
  ["Idli Sambar","Steamed rice cakes with sambar and chutneys",7,"GF"],
  ["Plain Dosa","Thin, golden dosa with sambar and chutneys",8,"GF"],
  ["Masala Dosa","Crisp dosa filled with spiced potato masala",12,"GF"],
  ["Jini Dosa","Loaded street-style dosa, sliced to share",16,"🌶🌶"]]},
 {id:"quick-bites",title:"Sandwiches & Bites",items:[
  ["Samosa","Crisp pastry with a spiced potato filling",3,"🌶"],
  ["Onion Kachori","Flaky pastry filled with seasoned onion",3,"🌶"],
  ["Veg Cheese Grill Sandwich","Grilled vegetables, chutney and cheese",11,""],
  ["Chaat Junction Special Sandwich","The house grilled sandwich",12,"Bestseller"]]},
 {id:"meals",title:"Meals & More",items:[
  ["Chole Bhature","Spiced chickpeas with two fluffy bhature",16,"🌶"],
  ["Tava Pulav","Mumbai-style spiced rice from the tava",13,"Jain option"],
  ["Paneer Tava Pulav","Tava pulav with paneer",14,"Jain option"],
  ["Cheese Tava Pulav","Tava pulav finished with cheese",14,"Jain option"]]},
 {id:"drinks",title:"Desserts & Drinks",items:[
  ["Mango Shake","Chilled mango milkshake",11,""],
  ["Sweet Lassi","Classic chilled yogurt drink",8,"GF"],
  ["Mango Lassi","Mango and yogurt blended smooth",9,"GF"],
  ["Chaat Junction Special Cream","Rich house fruit-and-cream dessert",22,"Signature"]]}
];

export function MenuExperience(){
 const [branch,setBranch]=useState<Branch>("hamdan");
 const active=branches[branch];
 return <>
  <section className="branchPicker" aria-label="Choose menu branch"><div><p className="kicker">Choose your branch</p><h2>What are you craving today?</h2></div><div className="branchTabs" role="group" aria-label="Branch"><button className={branch==="hamdan"?"active":""} onClick={()=>setBranch("hamdan")}>Hamdan Street</button><button className={branch==="madinat"?"active":""} onClick={()=>setBranch("madinat")}>Madinat Zayed</button></div><p>Showing items listed for <strong>{active.label}</strong>. Availability and final prices are confirmed on Talabat.</p></section>
  <nav className="stickyCategories" aria-label="Menu categories">{categories.map(c=><a key={c.id} href={`#${c.id}`}>{c.title}</a>)}</nav>
  <section className="usefulMenu">{categories.map(category=><article className="pricedGroup" id={category.id} key={category.id}><header><p>{String(categories.indexOf(category)+1).padStart(2,"0")}</p><h2>{category.title}</h2></header><ul>{category.items.map(([name,description,price,tag])=><li key={String(name)}><div><strong>{name}</strong><p>{description}</p>{tag&&<span>{tag}</span>}</div><b>AED {Number(price).toFixed(2)}</b></li>)}</ul></article>)}</section>
  <OrderLauncher className="persistentOrder" initialBranch={branch} label={`Order from ${active.label}`}/>
 </>
}
