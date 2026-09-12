const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("show");clearTimeout(window.tt);window.tt=setTimeout(()=>t.classList.remove("show"),2300)}
function initials(e){return e.split("@")[0].slice(0,2).toUpperCase()||"TR"}
function displayName(e){return (e.split("@")[0]||"Traveller").replace(/[._-]+/g," ").replace(/\b\w/g,c=>c.toUpperCase())}
function showTravellerPage(id){$$('#tpages .page').forEach(x=>x.classList.toggle('active',x.dataset.id===id));$$('.nav').forEach(x=>x.classList.toggle('active',x.dataset.page===id));window.scrollTo({top:0,behavior:'smooth'})}
function showProviderPage(id){$$('#ppages .page').forEach(x=>x.classList.toggle('active',x.dataset.p===id));$$('.pnav').forEach(x=>x.classList.toggle('active',x.dataset.p===id));window.scrollTo({top:0,behavior:'smooth'})}
function enterTraveller(email,name){$('#otp').classList.add('hide');$('#auth').classList.add('hide');$('#travellerApp').classList.remove('hide');$('#providerApp').classList.add('hide');$('#tName').textContent=name||displayName(email);$('#welcome').textContent=name?name.split(/\s+/)[0]:displayName(email).split(/\s+/)[0];$('#tAvatar').textContent=initials(email);showTravellerPage('home');toast('Welcome to MARG. Your smart journey is ready.')}
function showOtp(role,email,name){window.pendingOtpRole=role;window.pendingTravellerEmail=email;window.pendingTravellerName=name||'';$('#otpEmail').textContent=email;$('#otpEyebrow').textContent=role==='provider'?'SECURE PARTNER LOGIN':'SECURE TRAVELLER LOGIN';$('#otpTitle').textContent=role==='provider'?'Verify your business':'Verify your email';$('#otpMessage').innerHTML=`We've sent a 6-digit OTP to <b>${email}</b>.`;$('#auth').classList.add('hide');$('#otp').classList.remove('hide');otpBoxesClear();setTimeout(()=>$('.otp-inputs input').focus(),100);toast('OTP sent. Enter the 6-digit code to continue.')}
function enterProvider(email,name){$('#otp').classList.add('hide');$('#auth').classList.add('hide');$('#travellerApp').classList.add('hide');$('#providerApp').classList.remove('hide');const bn=name||displayName(email);$('#businessName').textContent=bn;$('#businessTop').textContent=bn;showProviderPage('pdashboard');toast('Business verified. Welcome to MARG Partner Portal.')}
$$('.role').forEach(b=>b.onclick=()=>{$$('.role').forEach(x=>x.classList.remove('active'));b.classList.add('active');const p=b.dataset.role==='provider';$('#travellerAuth').classList.toggle('hide',p);$('#providerAuth').classList.toggle('hide',!p)});
$$('.auth-tab').forEach(b=>b.onclick=()=>{$$('.auth-tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');const c=b.dataset.tab==='create';$('#signIn').classList.toggle('hide',c);$('#create').classList.toggle('hide',!c)});
let travellerLoginMethod='password';
$$('.method').forEach(b=>b.onclick=()=>{$$('.method').forEach(x=>x.classList.remove('active'));b.classList.add('active');travellerLoginMethod=b.dataset.method;const otp=travellerLoginMethod==='otp';$('#passwordLoginFields').classList.toggle('hide',otp);$('#otpLoginFields').classList.toggle('hide',!otp);$('#password').required=!otp});
$('#signIn').onsubmit=e=>{e.preventDefault();const em=$('#email').value.trim(),pw=$('#password').value;if(!em.includes('@'))return $('#loginErr').textContent='Please enter a valid email address.';if(travellerLoginMethod==='password' && pw.length<4)return $('#loginErr').textContent='Password must be at least 4 characters.';showOtp('traveller',em)};
$('#create').onsubmit=e=>{e.preventDefault();const n=$('#cname').value.trim(),em=$('#cemail').value.trim(),pw=$('#cpass').value;if(!n)return $('#createErr').textContent='Please enter your name.';if(!em.includes('@'))return $('#createErr').textContent='Please enter a valid email address.';if(pw.length<4)return $('#createErr').textContent='Password must be at least 4 characters.';showOtp('traveller',em,n)};
$('#providerForm').onsubmit=e=>{e.preventDefault();const em=$('#pemail').value.trim(),pw=$('#ppass').value;if(!em.includes('@'))return $('#providerErr').textContent='Please enter a valid business email.';if(pw.length<4)return $('#providerErr').textContent='Password must be at least 4 characters.';showOtp('provider',em)};
$$('.provider-tabs .auth-tab').forEach(b=>b.onclick=()=>{$$('.provider-tabs .auth-tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');const c=b.dataset.ptab==='create';$('#providerForm').classList.toggle('hide',c);$('#providerCreateForm').classList.toggle('hide',!c)});
$('#providerCreateForm').onsubmit=e=>{e.preventDefault();const n=$('#pname').value.trim(),em=$('#pcemail').value.trim(),pw=$('#pcpass').value;if(!n)return $('#providerCreateErr').textContent='Please enter your business name.';if(!em.includes('@'))return $('#providerCreateErr').textContent='Please enter a valid business email.';if(pw.length<4)return $('#providerCreateErr').textContent='Password must be at least 4 characters.';$('#providerCreateErr').textContent='';window.pendingBusinessName=n;showOtp('provider',em,n)};
$('#pforgot').onclick=()=>toast('Password recovery is available in the partner account flow.');
function togglePass(id,btn){const p=$(id);p.type=p.type==='password'?'text':'password';btn.textContent=p.type==='password'?'Show':'Hide'}
$('#showPass').onclick=()=>togglePass('#password',$('#showPass'));$('#showCPass').onclick=()=>togglePass('#cpass',$('#showCPass'));$('#showPPass').onclick=()=>togglePass('#ppass',$('#showPPass'));
function otpBoxesClear(){otpBoxes.forEach(x=>x.value='');$('#otpErr').textContent=''}
const otpBoxes=$$('.otp-inputs input');
otpBoxes.forEach((box,i)=>{
  box.inputMode='numeric';
  box.autocomplete=i===0?'one-time-code':'off';
  box.addEventListener('input',()=>{
    const digits=box.value.replace(/\D/g,'');
    box.value=digits ? digits.slice(-1) : '';
    if(box.value && i<otpBoxes.length-1){
      otpBoxes[i+1].focus();
      otpBoxes[i+1].select();
    }
    if(otpBoxes.every(b=>b.value)) $('#otpErr').textContent='';
  });
  box.addEventListener('keydown',e=>{
    if(e.key==='Backspace'){
      if(box.value){ box.value=''; e.preventDefault(); }
      else if(i>0){ otpBoxes[i-1].focus(); otpBoxes[i-1].select(); }
    }
    if(e.key==='ArrowLeft' && i>0){ e.preventDefault(); otpBoxes[i-1].focus(); }
    if(e.key==='ArrowRight' && i<otpBoxes.length-1){ e.preventDefault(); otpBoxes[i+1].focus(); }
  });
  box.addEventListener('paste',e=>{
    e.preventDefault();
    const code=(e.clipboardData||window.clipboardData).getData('text').replace(/\D/g,'').slice(0,6);
    otpBoxes.forEach((el,j)=>el.value=code[j]||'');
    otpBoxes[Math.min(code.length,otpBoxes.length-1)].focus();
  });
});
$('#verifyOtp').onclick=()=>{const code=$$('.otp-inputs input').map(x=>x.value).join('');if(code!=='123456')return $('#otpErr').textContent='Incorrect OTP. Please check the 6-digit code.';if(window.pendingOtpRole==='traveller')enterTraveller(window.pendingTravellerEmail,window.pendingTravellerName);else enterProvider($('#pemail').value.trim()||$('#pcemail').value.trim(),window.pendingBusinessName||window.pendingTravellerName)};
$('#resendOtp').onclick=()=>{toast('A new demo OTP has been sent.');$('#otpErr').textContent=''};
$$('#tpages [data-page]').forEach(b=>b.onclick=()=>showTravellerPage(b.dataset.page));$$('.nav').forEach(b=>b.onclick=()=>showTravellerPage(b.dataset.page));$$('.pnav').forEach(b=>b.onclick=()=>showProviderPage(b.dataset.p));$$('#ppages [data-p]').forEach(b=>b.onclick=()=>showProviderPage(b.dataset.p));
$$('.dest').forEach(b=>b.onclick=()=>{showTravellerPage('planner');$('#tdest').value=b.dataset.dest});$$('.choose').forEach(b=>b.onclick=()=>{showTravellerPage('planner');$('#tdest').value=b.dataset.dest});
$('#budget').oninput=e=>{$('#budgetOut').textContent='₹'+Number(e.target.value).toLocaleString('en-IN');$('#planBudget').textContent=$('#budgetOut').textContent};
$$('.prefs button').forEach(b=>b.onclick=()=>b.classList.toggle('selected'));$('#route').onclick=()=>toast('MARG updated your crowd-aware route.');$('#generate').onclick=()=>{$('#planTitle').textContent=`${$('#tdest').value}: your MARG plan is ready`;toast('AI itinerary generated using your preferences.')};
$$('[data-booktab]').forEach(b=>b.onclick=()=>{$$('[data-booktab]').forEach(x=>x.classList.remove('active'));b.classList.add('active');$('#hotels').classList.toggle('hide',b.dataset.booktab!=='hotels');$('#transport').classList.toggle('hide',b.dataset.booktab!=='transport')});
$$('.book').forEach(b=>b.onclick=()=>{openModal('BOOKING READY','This SIH prototype has selected the option for your trip. In a production build, this would connect to live booking and payment providers.','Confirm demo booking')});
$('#sos').onclick=()=>openModal('SOS ACTIVATED','For this hackathon prototype, MARG simulates the emergency flow: trusted companions are alerted and local emergency support is surfaced.','I’m safe — close');
$('#addComp').onclick=()=>{const n=prompt('Enter companion name:');if(!n)return;const d=document.createElement('div');d.className='person';d.innerHTML=`<span>${n.slice(0,2).toUpperCase()}</span><div><b>${n}</b><small>Traveller · Emergency details ready</small></div><i>✓ Added</i>`;$('#compList').appendChild(d);toast(n+' added to your group.')};
$$('.localadd').forEach(b=>b.onclick=()=>toast('Experience added to your MARG trip.'));
$$('.accept').forEach(b=>b.onclick=()=>toast('Request updated successfully.'));
$$('.reply').forEach(b=>b.onclick=()=>{const r=prompt('Write your reply:');if(r)toast('Reply saved.')});
$('#saveBusiness').onclick=()=>toast('Business profile saved ✓');$('#saveBadge').onclick=()=>toast('Sustainability badge profile saved ✓');$('#saveSettings').onclick=()=>toast('Partner settings saved ✓');$$('.addlisting').forEach(b=>b.onclick=()=>toast('New listing form opened in this prototype.'));$$('.edit').forEach(b=>b.onclick=()=>toast('Listing editor opened.')); 
function openModal(title,text,action){$('#modalContent').innerHTML=`<span class="eyebrow dark">MARG</span><h2>${title}</h2><p>${text}</p><button class="primary wide" id="modalAction">${action}</button>`;$('#modal').classList.remove('hide');$('#modalAction').onclick=()=>{$('#modal').classList.add('hide');toast('Done ✓')}}
$('#close').onclick=()=>$('#modal').classList.add('hide');$('#tLogout').onclick=()=>location.reload();$('#pLogout').onclick=()=>location.reload();$('#forgot').onclick=()=>toast('Password recovery is simulated in this SIH prototype.');
// Always start at the authentication screen on a fresh page load.
$('#auth').classList.remove('hide');$('#otp').classList.add('hide');$('#travellerApp').classList.add('hide');$('#providerApp').classList.add('hide');
