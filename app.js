const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function showToast(message){
  const t=$("#toast"); t.textContent=message; t.classList.add("show");
  clearTimeout(window.__toast); window.__toast=setTimeout(()=>t.classList.remove("show"),2600);
}
function showView(id){
  $$(".view").forEach(v=>v.classList.toggle("active",v.id===`view-${id}`));
  $$(".nav").forEach(n=>n.classList.toggle("active",n.dataset.view===id));
  window.scrollTo({top:0,behavior:"smooth"});
}
function initials(email){ return email.split("@")[0].slice(0,2).toUpperCase(); }

function enterApp(email){
  localStorage.setItem("marg_demo_session", JSON.stringify({email, loggedIn:true}));
  $("#authScreen").classList.add("hidden");
  $("#app").classList.remove("hidden");
  const displayName = (email.split("@")[0] || "Traveller").replace(/[._-]+/g, " ").replace(/\b\w/g, c=>c.toUpperCase());
  $("#profileName").textContent = displayName;
  $("#profileAvatar").textContent = initials(email);
  $("#welcomeName").textContent = displayName;
}
function logout(){
  localStorage.removeItem("marg_demo_session");
  $("#app").classList.add("hidden");
  $("#authScreen").classList.remove("hidden");
  $("#loginForm").reset();
}

$("#loginForm").addEventListener("submit", e=>{
  e.preventDefault();
  const email=$("#email").value.trim(), password=$("#password").value;
  if(!email || !email.includes("@")) { $("#loginError").textContent="Please enter a valid email address."; return; }
  if(password.length<4) { $("#loginError").textContent="Password must be at least 4 characters."; return; }
  $("#loginError").textContent="";
  enterApp(email);
  showToast("Welcome to MARG. Your smart journey is ready.");
});
$("#createForm").addEventListener("submit", e=>{
  e.preventDefault();
  const name=$("#createName").value.trim(), email=$("#createEmail").value.trim(), password=$("#createPassword").value;
  if(!name) { $("#createError").textContent="Please enter your name."; return; }
  if(!email || !email.includes("@")) { $("#createError").textContent="Please enter a valid email address."; return; }
  if(password.length<4) { $("#createError").textContent="Password must be at least 4 characters."; return; }
  $("#createError").textContent="";
  enterApp(email);
  showToast(`Welcome to MARG, ${name.split(/\s+/)[0]}. Your profile is ready.`);
});
$("#togglePassword").addEventListener("click",()=>{
  const p=$("#password"); p.type=p.type==="password"?"text":"password"; $("#togglePassword").textContent=p.type==="password"?"Show":"Hide";
});
$("#toggleCreatePassword").addEventListener("click",()=>{
  const p=$("#createPassword"); p.type=p.type==="password"?"text":"password"; $("#toggleCreatePassword").textContent=p.type==="password"?"Show":"Hide";
});
$$('.auth-tab').forEach(tab=>tab.addEventListener('click',()=>{
  $$('.auth-tab').forEach(t=>t.classList.toggle('active',t===tab));
  const create=tab.dataset.authTab==='create';
  $('#loginForm').classList.toggle('active',!create);
  $('#createForm').classList.toggle('active',create);
}));
$("#forgotBtn").addEventListener("click",()=>showToast("Password recovery is simulated in this SIH prototype."));
$("#logoutBtn").addEventListener("click", logout);

// Always show the login page when the prototype is opened/refreshed.
// The entered email is shown on the dashboard after successful demo login.
localStorage.removeItem("marg_demo_session");
$("#authScreen").classList.remove("hidden");
$("#app").classList.add("hidden");


$$(".feature-launch").forEach(btn=>btn.addEventListener("click",()=>{
  const f=btn.dataset.feature;
  if(f==="booking") showView("bookings");
  if(f==="route"||f==="ai") { showView("planner"); if(f==="route") showToast("MARG is showing a crowd-aware route."); }
  if(f==="safety") showView("safety");
  if(f==="companions") { showView("safety"); setTimeout(()=>$("#companionPanel").scrollIntoView({behavior:"smooth",block:"center"}),150); }
  if(f==="language") $("#languageMenu").classList.remove("hidden");
}));

$("#languageBtn").addEventListener("click",()=>$("#languageMenu").classList.toggle("hidden"));
$$("[data-lang]").forEach(b=>b.addEventListener("click",()=>{
  $("#languageBtn").textContent=b.dataset.lang; $("#languageMenu").classList.add("hidden"); showToast(`Language changed to ${b.textContent}.`);
}));
$("#notifBtn").addEventListener("click",()=>showToast("No new alerts. Your trip is looking good."));

$("#budget").addEventListener("input",e=>{
  $("#budgetOut").textContent=`₹${Number(e.target.value).toLocaleString("en-IN")}`;
  $("#planBudget").textContent=`₹${Number(e.target.value).toLocaleString("en-IN")}`;
});
$$(".pref").forEach(b=>b.addEventListener("click",()=>b.classList.toggle("selected")));

$("#routeSuggest").addEventListener("click",()=>{
  const crowd=$("#crowdMode").checked, budget=$("#budgetMode").checked;
  const dest=$("#destination").value;
  const route = dest==="Hampi" ? "Virupaksha Temple → Riverside Lane → Achyutaraya Bazaar" : dest==="Sikkim" ? "Gangtok → Rumtek → Local Village Trail" : dest==="Kerala" ? "Fort Kochi → Local Market → Backwater Community Trail" : "Amber Fort → Local Craft Lane → City Palace";
  $("#routePreview").innerHTML=`<span>${crowd?"LOW-CROWD ROUTE":"STANDARD ROUTE"}</span><b>${route}</b><small>${crowd?"Recommended off-peak start · avoids congestion":"Optimized for direct travel"}${budget?" · Budget checked ✓":""}</small>`;
  showToast("Smart route updated.");
});
$("#generatePlan").addEventListener("click",()=>{
  const dest=$("#destination").value;
  $("#planTitle").textContent=`${dest}: your MARG plan is ready`;
  $("#planBudget").textContent=`₹${Number($("#budget").value).toLocaleString("en-IN")}`;
  showToast("AI itinerary generated using your preferences.");
});

$$(".tab").forEach(tab=>tab.addEventListener("click",()=>{
  $$(".tab").forEach(t=>t.classList.remove("active")); tab.classList.add("active");
  $("#hotels").classList.toggle("hidden",tab.dataset.tab!=="hotels");
  $("#transport").classList.toggle("hidden",tab.dataset.tab!=="transport");
}));
$$(".book-btn").forEach(b=>b.addEventListener("click",()=>{
  $("#modalContent").innerHTML=`<span class="eyebrow dark">BOOKING READY</span><h2>You're almost there.</h2><p>This SIH prototype has selected the option for your trip. In a production build, the next step would connect to a live booking/payment provider.</p><button class="primary wide" id="confirmBooking">Confirm demo booking</button>`;
  $("#modal").classList.remove("hidden");
  $("#confirmBooking").addEventListener("click",()=>{ $("#modal").classList.add("hidden"); showToast("Demo booking confirmed ✓"); });
}));
$("#closeModal").addEventListener("click",()=>$("#modal").classList.add("hidden"));

$("#sosBtn").addEventListener("click",()=>{
  $("#modalContent").innerHTML=`<span class="eyebrow dark">SOS ACTIVATED</span><h2>Emergency mode is on.</h2><p>For this hackathon prototype, MARG simulates the emergency flow: trusted companions are alerted and nearby emergency support is surfaced.</p><button class="primary wide" id="ackSOS">I'm safe — close</button>`;
  $("#modal").classList.remove("hidden");
  $("#ackSOS").addEventListener("click",()=>{ $("#modal").classList.add("hidden"); showToast("SOS flow closed."); });
});
$("#addCompanion").addEventListener("click",()=>{
  const name=prompt("Enter companion name:");
  if(!name?.trim()) return;
  const item=document.createElement("div"); item.className="companion";
  item.innerHTML=`<span class="avatar">${name.trim().slice(0,2).toUpperCase()}</span><div><b>${name.trim()}</b><small>Traveller · Emergency details ready</small></div><span class="verified">✓ Added</span>`;
  $("#companionList").appendChild(item); showToast(`${name.trim()} added to your group.`);
});
$$(".local-btn").forEach(b=>b.addEventListener("click",()=>showToast("Experience added to your MARG trip.")));
$$(".destination-card").forEach(card=>card.addEventListener("click",()=>{
  showView("planner"); $("#destination").value=card.dataset.destination; showToast(`${card.dataset.destination} selected for your AI plan.`);
}));
$("#search").addEventListener("keydown",e=>{if(e.key==="Enter"&&e.target.value.trim()){showToast(`Searching MARG for “${e.target.value.trim()}”`);e.target.blur();}});
// v5 navigation additions
$$("[data-view]").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const view = btn.dataset.view;
    if(view) showView(view);
  });
});
$$(".choose-dest").forEach(btn=>btn.addEventListener("click",()=>{
  showView("planner");
  $("#destination").value=btn.dataset.dest;
  showToast(`${btn.dataset.dest} selected for your AI plan.`);
}));
$$(".mini-destination").forEach(btn=>btn.addEventListener("click",()=>{
  showView("planner");
  if($("#destination")) $("#destination").value=btn.dataset.destination;
  showToast(`${btn.dataset.destination} selected for your AI plan.`);
}));
