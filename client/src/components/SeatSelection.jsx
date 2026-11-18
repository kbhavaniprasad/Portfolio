import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Armchair, Check, ChevronDown, CircleHelp, Plane, RotateCcw, ShieldCheck, Utensils, X } from 'lucide-react';
import './SeatSelection.css';

const passengerSeed = [
  { id: 1, name: 'Bhavani Prasad', type: 'Adult', seat: null, meal: 'No meal' },
  { id: 2, name: 'Passenger 2', type: 'Adult', seat: null, meal: 'No meal' },
];
const meals = [
  ['No meal', 'Complimentary', 0, 'Keep it simple'], ['Standard veg', 'Complimentary', 0, 'Fresh & balanced'],
  ['Standard non-veg', 'Complimentary', 0, 'A classic inflight meal'], ['Kids meal', 'Complimentary', 0, 'Made for little flyers'],
  ['Vegan', '+ ₹150', 150, 'Plant-based goodness'], ["Chef’s special", '+ ₹300', 300, 'A little something special'],
];
const occupied = new Set(['2B','3D','5A','6F','8C','10E','12A','14D','16B','18F','20C','22E','24A','26D','28B']);
const seatPrice = { standard: 0, premium: 450, extra: 850 };
const money = n => `₹${n.toLocaleString('en-IN')}`;

function category(row, letter) {
  if ([1, 2].includes(row)) return 'premium';
  if (row === 12 || row === 13) return 'extra';
  return 'standard';
}

export default function SeatSelection() {
  const [passengers, setPassengers] = useState(() => {
    try { const saved = JSON.parse(localStorage.getItem('skyward-seat-demo')); return saved?.passengers?.length ? saved.passengers : passengerSeed; }
    catch { return passengerSeed; }
  });
  const [active, setActive] = useState(1);
  const [step, setStep] = useState('seats');
  const [confirmed, setConfirmed] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMode, setErrorMode] = useState(false);
  const [hovered, setHovered] = useState(null);
  const activePassenger = passengers.find(p => p.id === active) || passengers[0];
  const total = useMemo(() => passengers.reduce((sum, p) => sum + (p.seat ? seatPrice[p.seat.category] : 0) + (meals.find(m => m[0] === p.meal)?.[2] || 0), 0), [passengers]);

  useEffect(() => { localStorage.setItem('skyward-seat-demo', JSON.stringify({ passengers })); }, [passengers]);
  const updatePassenger = (id, changes) => setPassengers(current => current.map(p => p.id === id ? { ...p, ...changes } : p));
  const pickSeat = (row, letter) => {
    const id = `${row}${letter}`;
    if (occupied.has(id)) return;
    const currentHolder = passengers.find(p => p.seat?.id === id && p.id !== active);
    if (currentHolder) { setMessage(`${id} is already selected for ${currentHolder.name}. Choose another seat.`); return; }
    setMessage(''); setConfirmed(false);
    updatePassenger(active, { seat: activePassenger.seat?.id === id ? null : { id, category: category(row, letter), row, letter } });
  };
  const addPassenger = () => {
    if (passengers.length >= 6) { setMessage('This demo supports up to six passengers.'); return; }
    const id = Math.max(...passengers.map(p => p.id)) + 1;
    setPassengers([...passengers, { id, name: `Passenger ${id}`, type: 'Adult', seat: null, meal: 'No meal' }]); setActive(id);
  };
  const reset = () => { setPassengers(passengerSeed); setActive(1); setStep('seats'); setConfirmed(false); setMessage('Your selections have been reset.'); };
  const confirm = () => {
    const noSeat = passengers.find(p => !p.seat);
    if (noSeat) { setMessage(`Choose a seat for ${noSeat.name} before reviewing.`); setActive(noSeat.id); setStep('seats'); return; }
    if (new Set(passengers.map(p => p.seat?.id)).size !== passengers.length) { setMessage('Each passenger needs a different seat.'); return; }
    if (errorMode) { setMessage('We couldn’t save this review just now. Your selections are safe. Retry when ready.'); setErrorMode(false); return; }
    setMessage(''); setConfirmed(true); setStep('review');
  };
  const stepNames = [['passengers','Passengers'],['seats','Choose seats'],['meals','Meals'],['review','Review']];
  const rows = Array.from({ length: 30 }, (_, i) => i + 1);
  const columns = ['A','B','C','D','E','F'];
  const aisle = letter => letter === 'D';

  return <div className="seat-app">
    <header className="seat-topbar"><a className="seat-brand" href="/"><span className="brand-mark"><Plane size={19}/></span><span>skyward<span className="brand-dot">.</span><small>TRAVEL, MADE PERSONAL</small></span></a><div className="topbar-right"><span className="secure-label"><ShieldCheck size={15}/> Secure booking</span><button className="help-link" onClick={() => setMessage('Need help? Your selections are saved automatically in this browser.') }><CircleHelp size={17}/> Help</button><button className="avatar">BP</button></div></header>
    <main className="seat-shell">
      <button className="back-link" onClick={() => window.location.assign('/')}><ArrowLeft size={16}/> Back to trip details</button>
      <section className="trip-card"><div className="trip-title"><div><span className="eyebrow">FLIGHT 6E 218 · 14 NOVEMBER 2026</span><h1>Make this flight yours<span>.</span></h1><p>Choose your seats and meal preferences before you fly.</p></div><div className="aircraft-tag"><Plane size={16}/> Airbus A320neo</div></div><div className="route-line"><div><strong>BLR</strong><span>Bengaluru</span><small>08:10 · Terminal 1</small></div><div className="route-mid"><span>2h 45m</span><div><i></i><Plane size={15}/><i></i></div><small>Non-stop</small></div><div className="route-dest"><strong>DEL</strong><span>New Delhi</span><small>10:55 · Terminal 2</small></div><div className="trip-class">Economy <b>·</b> Flex</div></div></section>
      <nav className="progress-steps" aria-label="Booking progress">{stepNames.map(([key, label], i) => <button key={key} className={`progress-step ${step === key ? 'current' : ''} ${stepNames.findIndex(x => x[0] === step) > i ? 'done' : ''}`} onClick={() => { if (key === 'review' && passengers.some(p => !p.seat)) { setMessage('Select a seat for every passenger first.'); return; } setStep(key); setConfirmed(false); }}><span className="step-index">{stepNames.findIndex(x => x[0] === step) > i ? <Check size={14}/> : `0${i+1}`}</span>{label}</button>)}</nav>
      {message && <div className={`inline-message ${message.includes('couldn’t') ? 'warning' : ''}`} role="status"><span>{message.includes('couldn’t') ? 'Connection issue' : 'A quick note'} · {message}</span><button onClick={() => setMessage('')} aria-label="Dismiss"><X size={15}/></button></div>}
      {confirmed ? <section className="confirmation-card"><div className="confirm-icon"><Check size={27}/></div><span className="eyebrow">SELECTION REVIEW COMPLETE</span><h2>Your trip, your way.</h2><p>This is a saved seat and meal review. No booking or payment has been made.</p><div className="confirm-list">{passengers.map(p => <div key={p.id}><span>{p.name}</span><b>{p.seat?.id} · {p.meal}</b><strong>{money((p.seat ? seatPrice[p.seat.category] : 0)+(meals.find(m=>m[0]===p.meal)?.[2]||0))}</strong></div>)}</div><div className="confirm-total"><span>Total selected add-ons</span><strong>{money(total)}</strong></div><button className="primary-button" onClick={() => { setConfirmed(false); setStep('seats'); }}>Modify selections <ArrowRight size={16}/></button></section> : <div className="booking-layout">
        <section className="map-column">
          {step === 'meals' ? <section className="meal-card"><div className="section-heading"><div><span className="eyebrow">ONBOARD DINING</span><h2>Something good for the journey</h2><p>Choose one meal for each traveller. You can update it any time.</p></div><Utensils className="heading-icon" size={22}/></div><div className="passenger-tabs">{passengers.map(p => <button key={p.id} onClick={() => setActive(p.id)} className={p.id===active?'active':''}>{p.name}<small>{p.meal}</small></button>)}</div><div className="meal-options">{meals.map(([name, price, amount, description]) => <button key={name} className={`meal-option ${activePassenger.meal===name?'selected':''}`} onClick={() => { updatePassenger(active, { meal: name }); setMessage(''); }}><span className="meal-radio">{activePassenger.meal===name && <i/>}</span><span className="meal-copy"><b>{name}</b><small>{description}</small></span><strong className={amount?'paid':''}>{price}</strong></button>)}</div><div className="meal-footer"><button className="text-button" onClick={() => setStep('seats')}><ArrowLeft size={15}/> Back to seats</button><button className="primary-button" onClick={confirm}>Review selections <ArrowRight size={16}/></button></div></section> : step === 'review' ? <section className="review-card"><span className="eyebrow">REVIEW YOUR CHOICES</span><h2>Everything in its place.</h2><p>Check each traveller’s seat and meal before completing your selection.</p>{passengers.map(p=><div className="review-passenger" key={p.id}><div className="review-avatar">{p.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div><div><b>{p.name}</b><small>Seat {p.seat?.id} · {p.seat?.category === 'extra' ? 'Extra legroom' : p.seat?.category === 'premium' ? 'Premium' : 'Standard'} · {p.meal}</small></div><strong>{money((p.seat ? seatPrice[p.seat.category] : 0)+(meals.find(m=>m[0]===p.meal)?.[2]||0))}</strong><button aria-label={`Edit ${p.name}`} onClick={()=>{setActive(p.id);setStep('seats');}}>Edit</button></div>)}<button className="text-button" onClick={()=>setStep('meals')}><Utensils size={15}/> Change meals</button><button className="primary-button wide" onClick={confirm}>Confirm selection <ArrowRight size={16}/></button><small className="demo-note">Local demo only · no reservation or payment is processed</small></section> : <>
            <div className="map-heading"><div><span className="eyebrow">YOUR SEAT MAP</span><h2>Pick your perfect spot</h2><p>Selecting for <b>{activePassenger.name}</b> <span>· {activePassenger.type}</span></p></div><div className="map-tools"><span><i className="live-dot"/> Live availability</span><button onClick={() => setMessage('Seat map refreshed. Availability shown is sample demo data.')}><RotateCcw size={14}/> Refresh</button></div></div>
            <div className="seat-legend"><span><i className="legend-box standard"/> Standard <b>Free</b></span><span><i className="legend-box premium"/> Premium <b>₹450</b></span><span><i className="legend-box extra"/> Extra legroom <b>₹850</b></span><span><i className="legend-box taken"/> Occupied</span><span><i className="legend-box chosen"/> Your selection</span></div>
            <div className="map-frame"><div className="aircraft"><div className="aircraft-nose"><div/><span>FRONT</span><Plane size={15}/></div><div className="cabin-label"><span>ECONOMY CLASS</span><small>30 ROWS · 180 SEATS</small></div><div className="seat-grid-scroll"><div className="seat-grid"><div className="seat-label-row"><span></span>{columns.map((c)=><span className={aisle(c)?'aisle-gap':''} key={c}>{c}</span>)}</div>{rows.map(row=><div className={`seat-row ${row===12?'extra-row':''}`} key={row}><b className="row-num">{row}</b>{columns.map(letter=>{const id=`${row}${letter}`, cat=category(row,letter), isTaken=occupied.has(id), mine=activePassenger.seat?.id===id, selected=passengers.some(p=>p.seat?.id===id);return <button key={letter} aria-label={`${id}, ${cat==='extra'?'extra legroom':cat}, ${isTaken?'occupied':mine?'selected':'available'}`} title={`${id} · ${cat==='extra'?'Extra legroom':cat==='premium'?'Premium':'Standard'} · ${isTaken?'Occupied':`Available · ${money(seatPrice[cat])}`}`} disabled={isTaken} onClick={()=>pickSeat(row,letter)} onMouseEnter={()=>setHovered(id)} onMouseLeave={()=>setHovered(null)} className={`seat ${cat} ${isTaken?'occupied':''} ${mine?'mine':''} ${selected&&!mine?'other-selected':''} ${aisle(letter)?'aisle-gap':''}`}>{mine?<Check size={12}/>:selected&&!isTaken?<span className="other-seat-dot"/>:null}{hovered===id&&<span className="seat-tooltip"><b>{id}</b><small>{isTaken?'Occupied':cat==='extra'?'Extra legroom':cat==='premium'?'Premium seat':'Standard seat'}</small><strong>{isTaken?'Unavailable':seatPrice[cat]===0?'Free':money(seatPrice[cat])}</strong></span>}</button>})}</div>)}</div></div><div className="aircraft-tail"><span>REAR</span><div><i/><i/><i/></div></div></div></div>
            <div className="map-footnote"><span><CircleHelp size={15}/> Prices are per passenger, per flight.</span><button onClick={()=>setStep('meals')}>Continue to meals <ArrowRight size={15}/></button></div>
          </>}
        </section>
        <aside className="booking-panel"><div className="panel-title"><div><span className="eyebrow">YOUR BOOKING</span><h3>Travellers <span>{passengers.length}</span></h3></div><button className="add-passenger" onClick={addPassenger}>+ Add</button></div><div className="traveller-list">{passengers.map(p=><button className={`traveller-card ${active===p.id?'active':''}`} key={p.id} onClick={()=>{setActive(p.id);setStep('seats');setConfirmed(false);}}><span className="traveller-avatar">{p.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</span><span className="traveller-main"><b>{p.name}</b><small><i className={p.seat?'assigned':''}/>{p.seat?`Seat ${p.seat.id}`:'Seat not selected'}</small></span><ChevronDown size={15} className="traveller-chevron"/></button>)}</div><div className="panel-divider"/><div className="panel-section-title"><Utensils size={16}/><h4>Meal preference</h4></div><button className="meal-select" onClick={()=>setStep('meals')}><span><b>{activePassenger.meal}</b><small>{meals.find(m=>m[0]===activePassenger.meal)?.[1]}</small></span><span className="change-label">Change <ArrowRight size={14}/></span></button><div className="panel-divider"/><div className="price-title"><h4>Price summary</h4><span>INR <ChevronDown size={13}/></span></div>{passengers.map(p=><div className="price-passenger" key={p.id}><span>{p.name}</span><b>{money((p.seat?seatPrice[p.seat.category]:0)+(meals.find(m=>m[0]===p.meal)?.[2]||0))}</b><small>{p.seat?`${p.seat.id} seat`:'No seat'} · {p.meal}</small></div>)}<div className="grand-total"><span>Total add-ons <small>for {passengers.length} travellers</small></span><strong>{money(total)}</strong></div><button className="primary-button panel-continue" onClick={()=>step==='seats'||step==='passengers'?setStep('meals'):confirm()}>{step==='seats'||step==='passengers'?'Continue to meals':'Confirm selection'} <ArrowRight size={16}/></button><button className="reset-button" onClick={reset}>Reset selections</button><div className="privacy-note"><ShieldCheck size={15}/><span>Your choices are saved in this browser.<br/><b>Demo itinerary · no flight is being booked.</b></span></div><label className="error-toggle"><input type="checkbox" checked={errorMode} onChange={e=>setErrorMode(e.target.checked)}/> Simulate a save error</label></aside>
      </div>}
      <footer className="seat-footer"><a href="/">← Portfolio</a><span>Seat selection preview · Illustrative flight and availability</span><span>© Skyward demo</span></footer>
    </main>
  </div>;
}
