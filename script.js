const choices = [...document.querySelectorAll('.choice')];
const addButtons = [...document.querySelectorAll('.add-flavour')];
const selected = [];
const max = 3;
const countLabel = document.getElementById('countLabel');
const selectedList = document.getElementById('selectedList');
const box = document.getElementById('customBox');
const emptyHint = document.getElementById('emptyHint');
const result = document.getElementById('revealResult');
const nameInput = document.getElementById('mixName');
const flavourDescriptions = {
  'Classic Salted':'A timeless, golden combination. Simple, crisp and always a good idea.',
  'Fire Masala':'A bold spicy mix with a little extra attitude.',
  'Sour Cream':'A cool and creamy combination made for laid-back snack breaks.'
};
function render(){
  countLabel.textContent = `${selected.length} / 3 SELECTED`;
  choices.forEach(b=>{const active=selected.includes(b.dataset.choice);b.classList.toggle('selected',active);b.querySelector('.choice-check').textContent=active?'✓':'+';});
  selectedList.innerHTML = selected.length ? selected.map(x=>`<span class="selected-pill">${x}</span>`).join('') : '<span class="empty-pill">Choose a flavour to begin</span>';
  box.classList.toggle('revealed',selected.length>0);
  emptyHint.style.display = selected.length ? 'none' : 'block';
  document.querySelectorAll('.add-flavour').forEach(b=>{b.textContent=selected.includes(b.dataset.flavour)?'✓':'+';});
}
function toggle(name){
  if(selected.includes(name)){selected.splice(selected.indexOf(name),1);}
  else if(selected.length<max){selected.push(name);}
  else {countLabel.textContent='MAXIMUM 3 SELECTED';return;}
  result.classList.remove('show');render();
}
choices.forEach(b=>b.addEventListener('click',()=>toggle(b.dataset.choice)));
addButtons.forEach(b=>b.addEventListener('click',()=>{toggle(b.dataset.flavour);document.getElementById('lab').scrollIntoView({behavior:'smooth'});}));
document.getElementById('createBox').addEventListener('click',()=>{
  if(!selected.length){countLabel.textContent='PICK AT LEAST 1 FLAVOUR';document.querySelector('.choice-list').scrollIntoView({behavior:'smooth',block:'center'});return;}
  const name=nameInput.value.trim() || 'The Signature Crunch';
  document.getElementById('resultName').textContent=name;
  document.getElementById('resultText').textContent=selected.map(x=>flavourDescriptions[x]).join(' ');
  result.classList.add('show');
  box.classList.remove('revealed');void box.offsetWidth;box.classList.add('revealed');
  result.scrollIntoView({behavior:'smooth',block:'nearest'});
});
document.getElementById('shareMix').addEventListener('click',async()=>{
  const text=`My Crunch Lab creation: ${nameInput.value.trim()||'The Signature Crunch'} — ${selected.join(' + ')}. Made with Crunch/Lab!`;
  const btn=document.getElementById('shareMix');
  try{await navigator.clipboard.writeText(text);btn.textContent='Copied! ✓';}
  catch{btn.textContent='Select and copy: '+text;}
  setTimeout(()=>btn.textContent='Copy my mix ↗',2200);
});
document.querySelector('.menu-toggle').addEventListener('click',()=>document.querySelector('.nav nav').classList.toggle('open'));
document.querySelectorAll('.nav nav a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.nav nav').classList.remove('open')));
