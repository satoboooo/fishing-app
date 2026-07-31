
import{initializeApp}from"https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";
import{getFirestore,collection,getDocs,addDoc,updateDoc,deleteDoc,doc,setDoc,getDoc}from"https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

const firebaseConfig={apiKey:"AIzaSyBDPN4E3_oBr6zXL6JI1XT1dFNkZdzPuaE",authDomain:"bamtournament-46b4a.firebaseapp.com",projectId:"bamtournament-46b4a",storageBucket:"bamtournament-46b4a.firebasestorage.app",messagingSenderId:"1091354077310",appId:"1:1091354077310:web:21717af313c67cde2e502f"};
const app=initializeApp(firebaseConfig);
const db=getFirestore(app);

const LANG={
ja:{participant:"参加者",admin:"管理者",appTitle:"🎣 釣り大会",adminPanel:"🎣 管理パネル",loginTitle:"🎣 参加者ログイン",loginDesc:"名前とパスワードを入力してください",name:"名前",password:"パスワード",login:"ログイン",newUser:"初めての方はこちら",register:"新規登録",regTitle:"📝 参加者登録",regDesc:"名前とパスワードを設定してください",passConfirm:"パスワード確認",registerBtn:"登録する",backLogin:"← ログインに戻る",required:"*必須",logout:"ログアウト",tabSubmit:"📝 申請",tabMy:"📋 My記録",tabApprove:"✅ 承認",tabRanking:"🏆 ランキング",tabMembers:"👥 参加者",tabEvents:"📅 大会",tabSettings:"⚙️ 設定",selectEvent:"大会を選択",allEvents:"全ての大会",closedMsg:"🔒 この大会は登録が締め切られています",formTitle:"🐟 釣果を申請",fish:"魚種",size:"サイズ",datetime:"撮影日時",dtHint:"写真から自動検出、または手動入力",photoUpload:"計測写真をアップロード",photoTap:"タップして写真を選択",memo:"メモ（任意）",memoPlaceholder:"ルアー、ポイントなど",submit:"申請する",myTitle:"📋 自分の申請一覧",noRecords:"まだ申請がありません",approved:"承認済",pending:"審査中",rejected:"却下",approvedSl:"承認済",pendingSl:"未承認",totalSl:"合計",noApproval:"未承認の申請はありません",approve:"✅ 承認",reject:"❌ 却下",rankTitle:"🏆 ランキング",noData:"データがありません",memTitle:"👥 登録者一覧",noMem:"登録なし",pwResetTitle:"🔑 パスワードリセット",noUsers:"登録ユーザーなし",reset:"リセット",resetPwTitle:"🔑 パスワードリセット",newPw:"新しいパスワード",evTitle:"📅 大会一覧",newEvent:"＋ 新しい大会を作成",evName:"大会名",evDate:"開催日",evPlace:"場所",create:"作成",active:"受付中",closed:"締切",close:"🔒 締切",reopen:"🔓 再開",del:"🗑",confirmClose:"締め切りますか？",confirmDelete:"を削除しますか？",stTitle:"⚙️ 設定",changePw:"管理者パスワード変更",pwHint:"空欄の場合は変更されません",savePw:"設定を保存",adminPwTitle:"🔒 管理者パスワード",cancel:"キャンセル",editTitle:"📝 編集",save:"保存",tNameReq:"⚠️ 名前とパスワードを入力",tNoUser:"⚠️ ユーザーが見つかりません",tWrongPw:"⚠️ パスワードが違います",tLoggedIn:"✅ ログインしました",tLoggedOut:"ログアウトしました",tNameEmpty:"⚠️ 名前を入力",tPwShort:"⚠️ パスワードは4文字以上",tPwMismatch:"⚠️ パスワードが一致しません",tNameExists:"⚠️ この名前は既に登録されています",tRegistered:"✅ 登録完了！",tSelectEv:"⚠️ 大会を選択",tClosed:"⚠️ 締め切られています",tSelectFish:"⚠️ 魚種を選択",tEnterSize:"⚠️ サイズを入力",tSubmitted:"✅ 申請しました！",tApproved:"✅ 承認",tRejected:"❌ 却下",tSaved:"✅ 保存",tCreated:"✅ 作成",tPwChanged:"✅ パスワード変更",tPwWrong:"⚠️ パスワードが違います",tEnterPw:"⚠️ 入力してください",tPw4:"⚠️ 4文字以上",tPwReset:"✅ リセット完了",tClosedEv:"🔒 締切",tReopened:"🔓 再開",tDeleted:"🗑 削除",exifDetected:"📅 撮影日時を検出: ",exifFailed:"⚠️ 検出できませんでした（手動入力してください）",fishOpt:["選択してください","スモールマウスバス","ラージマウスバス","その他"],fishEdit:["スモールマウスバス","ラージマウスバス","その他"],namePh:"例: 山田 太郎",evNamePh:"例: 第6回 バス釣り大会",evPlacePh:"例: 琵琶湖",selectEvDefault:"大会を選択してください",fish_count:"匹"},
en:{participant:"Participant",admin:"Admin",appTitle:"🎣 Tournament",adminPanel:"🎣 Admin Panel",loginTitle:"🎣 Participant Login",loginDesc:"Enter your name and password",name:"Name",password:"Password",login:"Login",newUser:"New here?",register:"Sign Up",regTitle:"📝 Registration",regDesc:"Set your name and password",passConfirm:"Confirm Password",registerBtn:"Register",backLogin:"← Back to Login",required:"*Required",logout:"Logout",tabSubmit:"📝 Submit",tabMy:"📋 My Records",tabApprove:"✅ Approve",tabRanking:"🏆 Ranking",tabMembers:"👥 Members",tabEvents:"📅 Events",tabSettings:"⚙️ Settings",selectEvent:"Select Event",allEvents:"All Events",closedMsg:"🔒 Registration is closed",formTitle:"🐟 Submit Catch",fish:"Species",size:"Size",datetime:"Date/Time",dtHint:"Auto-detected from photo or enter manually",photoUpload:"Upload measurement photo",photoTap:"Tap to select photo",memo:"Notes (optional)",memoPlaceholder:"Lure, spot, etc.",submit:"Submit",myTitle:"📋 My Submissions",noRecords:"No submissions yet",approved:"Approved",pending:"Pending",rejected:"Rejected",approvedSl:"Approved",pendingSl:"Pending",totalSl:"Total",noApproval:"No pending submissions",approve:"✅ Approve",reject:"❌ Reject",rankTitle:"🏆 Ranking",noData:"No data available",memTitle:"👥 Member List",noMem:"No members",pwResetTitle:"🔑 Password Reset",noUsers:"No registered users",reset:"Reset",resetPwTitle:"🔑 Password Reset",newPw:"New Password",evTitle:"📅 Event List",newEvent:"＋ Create New Event",evName:"Event Name",evDate:"Date",evPlace:"Location",create:"Create",active:"Open",closed:"Closed",close:"🔒 Close",reopen:"🔓 Reopen",del:"🗑",confirmClose:"Close registration?",confirmDelete:"Delete this event?",stTitle:"⚙️ Settings",changePw:"Change Admin Password",pwHint:"Leave blank to keep current",savePw:"Save Settings",adminPwTitle:"🔒 Admin Password",cancel:"Cancel",editTitle:"📝 Edit",save:"Save",tNameReq:"⚠️ Enter name and password",tNoUser:"⚠️ User not found",tWrongPw:"⚠️ Wrong password",tLoggedIn:"✅ Logged in",tLoggedOut:"Logged out",tNameEmpty:"⚠️ Enter a name",tPwShort:"⚠️ Password must be 4+ characters",tPwMismatch:"⚠️ Passwords don't match",tNameExists:"⚠️ Name already taken",tRegistered:"✅ Registered!",tSelectEv:"⚠️ Select an event",tClosed:"⚠️ Registration closed",tSelectFish:"⚠️ Select species",tEnterSize:"⚠️ Enter size",tSubmitted:"✅ Submitted!",tApproved:"✅ Approved",tRejected:"❌ Rejected",tSaved:"✅ Saved",tCreated:"✅ Created",tPwChanged:"✅ Password changed",tPwWrong:"⚠️ Wrong password",tEnterPw:"⚠️ Enter a value",tPw4:"⚠️ 4+ characters required",tPwReset:"✅ Password reset",tClosedEv:"🔒 Closed",tReopened:"🔓 Reopened",tDeleted:"🗑 Deleted",exifDetected:"📅 Date detected: ",exifFailed:"⚠️ Could not detect (enter manually)",fishOpt:["Select species","Smallmouth Bass","Largemouth Bass","Others"],fishEdit:["Smallmouth Bass","Largemouth Bass","Others"],namePh:"e.g. John Smith",evNamePh:"e.g. 6th Bass Tournament",evPlacePh:"e.g. Lake Biwa",selectEvDefault:"Please select an event",fish_count:" fish"}
};

let L={},currentUser=localStorage.getItem("fishUser6")||"",pendingPhoto="";
let users=[],catches=[],events=[];
const $=id=>document.getElementById(id);
function toast(m){const t=$("toast");t.textContent=m;t.className="toast";void t.offsetWidth;t.className="toast on";setTimeout(()=>t.className="toast",2500)}

async function fbGetAll(c){const s=await getDocs(collection(db,c));return s.docs.map(d=>({id:d.id,...d.data()}))}
async function fbAdd(c,data){const r=await addDoc(collection(db,c),data);return r.id}
async function fbUpdate(c,id,data){await updateDoc(doc(db,c,id),data)}
async function fbDelete(c,id){await deleteDoc(doc(db,c,id))}
async function loadData(){users=await fbGetAll("users");catches=await fbGetAll("catches");events=await fbGetAll("events")}
async function getAdminPw(){const d=await getDoc(doc(db,"settings","admin"));return d.exists()?d.data().pw:"admin123"}

function compressPhoto(file,cb){const r=new FileReader();r.onload=e=>{const img=new Image();img.onload=()=>{const c=document.createElement("canvas");let w=img.width,h=img.height;const max=600;if(w>h){if(w>max){h=h*(max/w);w=max}}else{if(h>max){w=w*(max/h);h=max}}c.width=w;c.height=h;c.getContext("2d").drawImage(img,0,0,w,h);cb(c.toDataURL("image/jpeg",0.5))};img.src=e.target.result};r.readAsDataURL(file)}

function exif(file,cb){const r=new FileReader();r.onload=e=>{try{const v=new DataView(e.target.result);if(v.getUint16(0,false)!==0xFFD8){cb(null);return}let o=2;const l=v.byteLength;while(o<l){if(o+4>l)break;if(v.getUint16(o,false)===0xFFE1){const eo=o+4;if(eo+6>l||v.getUint32(eo,false)!==0x45786966){cb(null);return}const to=eo+6;if(to+8>l){cb(null);return}const be=v.getUint16(to,false)===0x4D4D,io=v.getUint32(to+4,!be),is2=to+io;if(is2+2>l){cb(null);return}const tg=v.getUint16(is2,!be);let ep=null;for(let i=0;i<tg;i++){const en=is2+2+i*12;if(en+12>l)break;const t2=v.getUint16(en,!be);if(t2===0x0132){const vo=v.getUint32(en+8,!be)+to;let s="";for(let j=0;j<19&&vo+j<l;j++)s+=String.fromCharCode(v.getUint8(vo+j));const p=s.split(" ");if(p.length===2){cb(p[0].replace(/:/g,"-")+"T"+p[1].substring(0,5));return}}if(t2===0x8769)ep=v.getUint32(en+8,!be)}if(ep!==null){const es2=to+ep;if(es2+2<=l){const et=v.getUint16(es2,!be);for(let k=0;k<et;k++){const ee=es2+2+k*12;if(ee+12>l)break;const et2=v.getUint16(ee,!be);if(et2===0x9003||et2===0x9004){const vv=v.getUint32(ee+8,!be)+to;let ss="";for(let j2=0;j2<19&&vv+j2<l;j2++)ss+=String.fromCharCode(v.getUint8(vv+j2));const pp=ss.split(" ");if(pp.length===2){cb(pp[0].replace(/:/g,"-")+"T"+pp[1].substring(0,5));return}}}}}cb(null);return}if(o+2>=l)break;o+=2+v.getUint16(o+2,false)}cb(null)}catch(x){cb(null)}};r.onerror=()=>cb(null);r.readAsArrayBuffer(file.slice(0,131072))}

function applyLang(){
$("rP").textContent=L.participant;$("rA").textContent=L.admin;
$("hLogin").textContent=L.appTitle;$("bParticipant").textContent=L.participant;
$("loginTitle").textContent=L.loginTitle;$("loginDesc").textContent=L.loginDesc;
$("lbName").textContent=L.name;$("lbPass").textContent=L.password;
$("lName").placeholder=L.namePh;$("lPass").placeholder=L.password;
$("bLogin").textContent=L.login;$("newUserMsg").textContent=L.newUser;$("bGoReg").textContent=L.register;
$("hReg").textContent=L.appTitle;$("bNewReg").textContent=L.register;
$("regTitle").textContent=L.regTitle;$("regDesc").textContent=L.regDesc;
$("lbRegName").innerHTML=L.name+' <span style="color:#d32f2f;font-size:10px">'+L.required+"</span>";
$("lbRegPass").innerHTML=L.password+' <span style="color:#d32f2f;font-size:10px">'+L.required+"</span>";
$("lbRegPass2").innerHTML=L.passConfirm+' <span style="color:#d32f2f;font-size:10px">'+L.required+"</span>";
$("rName").placeholder=L.namePh;$("rPass").placeholder="4+";$("rPass2").placeholder=L.passConfirm;
$("bReg").textContent=L.registerBtn;$("bBackLogin").textContent=L.backLogin;
$("hMain").textContent=L.appTitle;$("bPart2").textContent=L.participant;
$("pEvName").textContent=L.selectEvDefault;$("bLogout").textContent=L.logout;
$("tSub").textContent=L.tabSubmit;$("tMy").textContent=L.tabMy;
$("clMsg").textContent=L.closedMsg;$("formTitle").textContent=L.formTitle;
$("lbFish").innerHTML=L.fish+' <span style="color:#d32f2f;font-size:10px">'+L.required+"</span>";
$("lbSize").innerHTML=L.size+' <span style="color:#d32f2f;font-size:10px">'+L.required+"</span>";
$("lbDT").textContent=L.datetime;$("dtHint").textContent=L.dtHint;
$("piT").textContent=L.photoUpload;$("piS").textContent=L.photoTap;
$("lbMemo").textContent=L.memo;$("iMemo").placeholder=L.memoPlaceholder;$("bSubmit").textContent=L.submit;
$("myTitle").textContent=L.myTitle;
$("iFish").innerHTML="";L.fishOpt.forEach((f,i)=>{const o=document.createElement("option");o.textContent=f;if(i===0)o.value="";$("iFish").appendChild(o)});
$("hAdmin").textContent=L.adminPanel;$("bAdmin").textContent=L.admin;
$("tApTx").textContent=L.tabApprove;$("tRk").textContent=L.tabRanking;$("tMm").textContent=L.tabMembers;$("tEv").textContent=L.tabEvents;$("tSt").textContent=L.tabSettings;
$("slOk").textContent=L.approvedSl;$("slPn").textContent=L.pendingSl;$("slAl").textContent=L.totalSl;
$("rkTitle").textContent=L.rankTitle;$("memTitle").textContent=L.memTitle;$("pwResetTitle").textContent=L.pwResetTitle;
$("evTitle").textContent=L.evTitle;$("bNewEv").textContent=L.newEvent;
$("stTitle").textContent=L.stTitle;$("lbPwCh").textContent=L.changePw;$("iPwCh").placeholder=L.newPw;$("pwHint").textContent=L.pwHint;$("bSvPw").textContent=L.savePw;
$("moPwTitle").textContent=L.adminPwTitle;$("iPwIn").placeholder=L.password;$("bPwNo").textContent=L.cancel;$("bPwOk").textContent=L.login;
$("moEdTitle").textContent=L.editTitle;$("lbEdNm").textContent=L.name;$("lbEdFi").textContent=L.fish;$("lbEdSz").textContent=L.size+"(cm)";$("lbEdDT").textContent=L.datetime;$("lbEdMe").textContent=L.memo;$("bEdOk").textContent=L.save;
$("edFi").innerHTML="";L.fishEdit.forEach(f=>{const o=document.createElement("option");o.textContent=f;$("edFi").appendChild(o)});
$("moNeTitle").textContent=L.newEvent;$("lbNeNm").textContent=L.evName;$("neNm").placeholder=L.evNamePh;$("lbNeDt").textContent=L.evDate;$("lbNePl").textContent=L.evPlace;$("nePl").placeholder=L.evPlacePh;$("bNeOk").textContent=L.create;
$("moRsPwTitle").textContent=L.resetPwTitle;$("lbRsPw").textContent=L.newPw;$("rsPwNew").placeholder=L.newPw;$("bRsPwNo").textContent=L.cancel;$("bRsPwOk").textContent=L.reset;
}

function showLogin(){$("loginPage").classList.remove("hide");$("regPage").classList.add("hide");$("pPage").classList.add("hide");$("aPage").classList.add("hide");$("rP").className="rb on-p";$("rA").className="rb"}
function showReg(){$("loginPage").classList.add("hide");$("regPage").classList.remove("hide");$("pPage").classList.add("hide");$("aPage").classList.add("hide")}
function showMain(){$("loginPage").classList.add("hide");$("regPage").classList.add("hide");$("pPage").classList.remove("hide");$("aPage").classList.add("hide");$("uName").textContent=currentUser;$("rP").className="rb on-p";$("rA").className="rb";updSel();renderMy()}
function showAdmin(){$("loginPage").classList.add("hide");$("regPage").classList.add("hide");$("pPage").classList.add("hide");$("aPage").classList.remove("hide");$("rP").className="rb";$("rA").className="rb on-a";updSel();renderAp()}

function updSel(){
const ac=events.filter(e=>e.st==="active"),al=events;
$("selEv").innerHTML='<option value="">'+L.selectEvent+"</option>";ac.forEach(e=>{$("selEv").innerHTML+="<option>"+e.name+"</option>"});if(ac.length===1){$("selEv").value=ac[0].name;onEvSel()}
$("selMyEv").innerHTML='<option value="">'+L.allEvents+"</option>";al.forEach(e=>{$("selMyEv").innerHTML+="<option>"+e.name+"</option>"});
$("selRkEv").innerHTML='<option value="">'+L.allEvents+"</option>";al.forEach(e=>{$("selRkEv").innerHTML+="<option>"+e.name+"</option>"});
$("selAEv").innerHTML='<option value="">'+L.allEvents+"</option>";al.forEach(e=>{$("selAEv").innerHTML+="<option>"+e.name+"</option>"});
$("selMEv").innerHTML='<option value="">'+L.allEvents+"</option>";al.forEach(e=>{$("selMEv").innerHTML+="<option>"+e.name+"</option>"});
}
function onEvSel(){const v=$("selEv").value,ev=events.find(e=>e.name===v);$("pEvName").textContent=v||L.selectEvDefault;if(ev&&ev.st==="closed"){$("formArea").classList.add("hide");$("clMsg").classList.remove("hide")}else{$("formArea").classList.remove("hide");$("clMsg").classList.add("hide")}}

$("bGoReg").addEventListener("click",showReg);
$("bBackLogin").addEventListener("click",showLogin);
$("bLogin").addEventListener("click",async()=>{const nm=$("lName").value.trim(),pw=$("lPass").value;if(!nm||!pw){toast(L.tNameReq);return}await loadData();const u=users.find(x=>x.name===nm);if(!u){toast(L.tNoUser);return}if(u.pw!==pw){toast(L.tWrongPw);return}currentUser=nm;localStorage.setItem("fishUser6",nm);showMain();toast(L.tLoggedIn)});
$("bReg").addEventListener("click",async()=>{const nm=$("rName").value.trim(),pw=$("rPass").value,pw2=$("rPass2").value;if(!nm){toast(L.tNameEmpty);return}if(pw.length<4){toast(L.tPwShort);return}if(pw!==pw2){toast(L.tPwMismatch);return}await loadData();if(users.find(x=>x.name===nm)){toast(L.tNameExists);return}await fbAdd("users",{name:nm,pw:pw});currentUser=nm;localStorage.setItem("fishUser6",nm);await loadData();showMain();toast(L.tRegistered)});
$("bLogout").addEventListener("click",()=>{currentUser="";localStorage.removeItem("fishUser6");showLogin();toast(L.tLoggedOut)});
$("rP").addEventListener("click",async()=>{if(currentUser){await loadData();showMain()}else{showLogin()}});
$("rA").addEventListener("click",()=>{$("iPwIn").value="";$("moPw").className="mo on";setTimeout(()=>$("iPwIn").focus(),300)});
$("bPwNo").addEventListener("click",()=>$("moPw").className="mo");
$("bPwOk").addEventListener("click",doPw);
$("iPwIn").addEventListener("keyup",e=>{if(e.key==="Enter")doPw()});
async function doPw(){const pw=await getAdminPw();if($("iPwIn").value===pw){$("moPw").className="mo";await loadData();showAdmin()}else{toast(L.tPwWrong);$("iPwIn").value="";$("iPwIn").focus()}}

$("tSub").addEventListener("click",()=>{$("tSub").className="tab on";$("tMy").className="tab";$("tcSub").className="tc on";$("tcMy").className="tc"});
$("tMy").addEventListener("click",async()=>{$("tMy").className="tab on";$("tSub").className="tab";$("tcMy").className="tc on";$("tcSub").className="tc";await loadData();renderMy()});
$("tAp").addEventListener("click",async()=>{setAT("Ap",$("tAp"));await loadData();renderAp()});
$("tRk").addEventListener("click",async()=>{setAT("Rk",$("tRk"));await loadData();renderRk()});
$("tMm").addEventListener("click",async()=>{setAT("Mm",$("tMm"));await loadData();renderMem()});
$("tEv").addEventListener("click",async()=>{setAT("Ev",$("tEv"));await loadData();renderEv()});
$("tSt").addEventListener("click",()=>setAT("St",$("tSt")));
function setAT(id,b){document.querySelectorAll("#aPage .tab").forEach(t=>t.className="tab");b.className="tab on-a";document.querySelectorAll("#aPage .tc").forEach(t=>t.className="tc");$("tc"+id).className="tc on"}

$("selEv").addEventListener("change",onEvSel);
$("selMyEv").addEventListener("change",renderMy);
$("selRkEv").addEventListener("change",renderRk);
$("selAEv").addEventListener("change",renderAp);
$("selMEv").addEventListener("change",renderMem);

$("iPhoto").addEventListener("change",function(){const f=this.files&&this.files[0];if(!f)return;compressPhoto(f,d=>{pendingPhoto=d;$("photoPreview").src=d;$("photoPreview").style.display="block";document.querySelector(".photo-lbl").classList.add("has");$("piI").style.display="none";$("piT").style.display="none";$("piS").style.display="none"});exif(f,dt=>{const b=$("exifBox");if(dt){$("iDT").value=dt;b.innerHTML=L.exifDetected+"<b>"+dt.replace("T"," ")+"</b>";b.className="exif on"}else{b.innerHTML=L.exifFailed;b.className="exif on"}})});
$("imgModal").addEventListener("click",()=>$("imgModal").className="img-modal");
function showImg(src){$("imgModalImg").src=src;$("imgModal").className="img-modal on"}

$("bSubmit").addEventListener("click",async()=>{const ev=$("selEv").value;if(!ev){toast(L.tSelectEv);return}const evo=events.find(e=>e.name===ev);if(evo&&evo.st==="closed"){toast(L.tClosed);return}const fi=$("iFish").value,sz=parseFloat($("iSize").value),me=$("iMemo").value.trim(),dt=$("iDT").value;if(!fi){toast(L.tSelectFish);return}if(!sz||sz<=0){toast(L.tEnterSize);return}const now=new Date(),tm=dt?dt.split("T")[1]:("0"+now.getHours()).slice(-2)+":"+("0"+now.getMinutes()).slice(-2);
await fbAdd("catches",{name:currentUser,fish:fi,size:sz,memo:me,status:"pending",time:tm,dt:dt||now.toISOString().slice(0,16),ev:ev,photo:pendingPhoto});
$("iFish").value="";$("iSize").value="";$("iMemo").value="";$("iDT").value="";$("photoPreview").style.display="none";document.querySelector(".photo-lbl").classList.remove("has");$("piI").style.display="";$("piT").style.display="";$("piS").style.display="";$("iPhoto").value="";$("exifBox").className="exif";pendingPhoto="";await loadData();toast(L.tSubmitted)});

function renderMy(){const sel=$("selMyEv").value;const recs=catches.filter(c=>c.name===currentUser&&(!sel||c.ev===sel));if(!recs.length){$("myList").innerHTML='<div style="text-align:center;padding:30px;color:#999;font-size:13px">'+L.noRecords+"</div>";return}let h="";recs.forEach(r=>{const sc=r.status==="approved"?"b-ok":r.status==="pending"?"b-pend":"b-ng",st=r.status==="approved"?L.approved:r.status==="pending"?L.pending:L.rejected,dt=r.dt?r.dt.replace("T"," "):r.time;const thumb=r.photo?'<img src="'+r.photo+'">':"🐟";h+='<div class="hi"><div class="th">'+thumb+'</div><div class="inf"><div class="t1">'+r.fish+" "+r.size+'cm</div><div class="t2">'+dt+" | "+r.ev+(r.memo?" | "+r.memo:"")+'</div></div><span class="badge '+sc+'">'+st+"</span></div>"});$("myList").innerHTML=h}

function renderRk(){const sel=$("selRkEv").value,ap=catches.filter(c=>c.status==="approved"&&(!sel||c.ev===sel));const pl={};ap.forEach(c=>{if(!pl[c.name])pl[c.name]={name:c.name,total:0,cnt:0,fish:[]};pl[c.name].total+=c.size;pl[c.name].cnt++;pl[c.name].fish.push(c)});const rk=Object.values(pl).sort((a,b)=>b.total-a.total);let lh="";rk.forEach((p,i)=>{const rc=i===0?"rk-1":i===1?"rk-2":i===2?"rk-3":"";lh+='<div class="rr" data-i="'+i+'"><div class="rk '+rc+'">'+(i+1)+'</div><div class="rn">'+p.name+'</div><div class="rt">'+p.total.toFixed(1)+'</div><div class="rc">'+p.cnt+L.fish_count+'</div></div><div class="rd" id="rd'+i+'">';p.fish.sort((a,b)=>b.size-a.size).forEach(f=>{lh+='<div class="rd-f"><span>'+f.fish+" "+f.size+'cm</span><span>'+f.time+"</span></div>"});lh+="</div>"});$("rkList").innerHTML=lh||'<div style="text-align:center;padding:30px;color:#999;font-size:13px">'+L.noData+"</div>";document.querySelectorAll(".rr").forEach(r=>r.addEventListener("click",function(){$("rd"+this.getAttribute("data-i")).classList.toggle("on")}))}

$("bCSV").addEventListener("click",()=>{const sel=$("selRkEv").value,ap=catches.filter(c=>c.status==="approved"&&(!sel||c.ev===sel));const pl={};ap.forEach(c=>{if(!pl[c.name])pl[c.name]={name:c.name,total:0,best:0,cnt:0};pl[c.name].total+=c.size;pl[c.name].cnt++;if(c.size>pl[c.name].best)pl[c.name].best=c.size});const rk=Object.values(pl).sort((a,b)=>b.total-a.total),d=[["Rank","Name","Total(cm)","Best(cm)","Count"]];rk.forEach((p,i)=>d.push([i+1,p.name,p.total.toFixed(1),p.best.toFixed(1),p.cnt]));const csv="\uFEFF"+d.map(r=>r.join(",")).join("\n"),bl=new Blob([csv],{type:"text/csv"}),a=document.createElement("a");a.href=URL.createObjectURL(bl);a.download="ranking.csv";a.click()});

function renderAp(){const sel=$("selAEv").value,fil=catches.filter(c=>!sel||c.ev===sel);const pn=fil.filter(c=>c.status==="pending"),ok=fil.filter(c=>c.status==="approved");$("sPn").textContent=pn.length;$("sOk").textContent=ok.length;$("sAl").textContent=fil.length;$("pBdg").textContent=catches.filter(c=>c.status==="pending").length;if(!pn.length){$("apList").innerHTML='<div style="text-align:center;padding:30px;color:#999;font-size:13px">'+L.noApproval+"</div>";return}let h="";pn.forEach(c=>{const dt=c.dt?c.dt.replace("T"," "):c.time;h+='<div class="mc"><div class="mc-h"><strong style="font-size:13px">'+c.name+'</strong><span class="badge b-pend">'+L.pending+'</span></div>';if(c.photo)h+='<div class="mc-photo"><img src="'+c.photo+'" data-img="'+c.id+'"></div>';h+='<div class="mc-i"><div class="mc-r"><span>'+L.fish+'</span><span>'+c.fish+'</span></div><div class="mc-r"><span>'+L.size+'</span><span style="color:#2e7d32">'+c.size+' cm</span></div><div class="mc-r"><span>'+L.datetime+'</span><span>'+dt+'</span></div>'+(c.memo?'<div class="mc-r"><span>'+L.memo+'</span><span>'+c.memo+"</span></div>":"")+'</div><div class="mc-a"><div class="mc-b"><button class="btn btn-g btn-sm" data-ok="'+c.id+'">'+L.approve+'</button><button class="btn btn-sm" style="background:#ffebee;color:#d32f2f;border:1px solid #ef9a9a" data-ng="'+c.id+'">'+L.reject+"</button></div></div></div>"});
$("apList").innerHTML=h;
document.querySelectorAll("[data-ok]").forEach(b=>b.addEventListener("click",async function(){const id=this.getAttribute("data-ok");await fbUpdate("catches",id,{status:"approved"});await loadData();renderAp();toast(L.tApproved)}));
document.querySelectorAll("[data-ng]").forEach(b=>b.addEventListener("click",async function(){const id=this.getAttribute("data-ng");await fbUpdate("catches",id,{status:"rejected"});await loadData();renderAp();toast(L.tRejected)}));
document.querySelectorAll("[data-img]").forEach(img=>img.addEventListener("click",function(){showImg(this.src)}));
}

function renderMem(){const sel=$("selMEv").value,fil=catches.filter(c=>!sel||c.ev===sel);const mem={};fil.forEach(c=>{if(!mem[c.name])mem[c.name]=[];mem[c.name].push(c)});let h="";Object.keys(mem).forEach(nm=>{h+='<div class="card" style="margin-bottom:8px"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><strong style="font-size:13px">'+nm+'</strong><span style="font-size:11px;color:#999">'+mem[nm].length+'</span></div>';mem[nm].forEach(c=>{const sc=c.status==="approved"?"b-ok":c.status==="pending"?"b-pend":"b-ng",st=c.status==="approved"?L.approved:c.status==="pending"?L.pending:L.rejected;const photoBtn=c.photo?'<button class="btn btn-sm" style="background:#e3f2fd;color:#1565c0;border:none" data-vimg="'+c.id+'">📷</button>':"";h+='<div style="display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid #f5f5f5;font-size:12px"><span>'+c.fish+" "+c.size+'cm</span><div style="display:flex;align-items:center;gap:4px"><span class="badge '+sc+'">'+st+"</span>"+photoBtn+'<button class="btn btn-s btn-sm" data-ed="'+c.id+'">✏️</button></div></div>'});h+="</div>"});
$("memList").innerHTML=h||'<div style="text-align:center;padding:30px;color:#999">'+L.noMem+"</div>";
document.querySelectorAll("[data-ed]").forEach(b=>b.addEventListener("click",function(){openEd(this.getAttribute("data-ed"))}));
document.querySelectorAll("[data-vimg]").forEach(b=>b.addEventListener("click",function(){const c=catches.find(x=>x.id===this.getAttribute("data-vimg"));if(c&&c.photo)showImg(c.photo)}));
let ph="";users.forEach(u=>{ph+='<div class="mem-item"><span>'+u.name+'</span><button class="btn btn-w btn-sm" data-rspw="'+u.name+'">'+L.reset+'</button></div>'});
$("pwResetList").innerHTML=ph||'<div style="text-align:center;padding:20px;color:#999;font-size:12px">'+L.noUsers+"</div>";
document.querySelectorAll("[data-rspw]").forEach(b=>b.addEventListener("click",function(){const nm=this.getAttribute("data-rspw");$("rsPwMsg").textContent=L.resetPwTitle+" - "+nm;$("rsPwName").value=nm;$("rsPwNew").value="";$("moRsPw").className="mo on"}));
}

$("bRsPwNo").addEventListener("click",()=>$("moRsPw").className="mo");
$("bRsPwOk").addEventListener("click",async()=>{const nm=$("rsPwName").value,np=$("rsPwNew").value;if(np.length<4){toast(L.tPw4);return}const u=users.find(x=>x.name===nm);if(u){await fbUpdate("users",u.id,{pw:np});$("moRsPw").className="mo";toast(L.tPwReset)}});

function openEd(id){const c=catches.find(x=>x.id===id);if(!c)return;$("edNm").value=c.name;$("edFi").value=c.fish;$("edSz").value=c.size;$("edDT").value=c.dt||"";$("edMe").value=c.memo||"";$("edId").value=id;$("moEd").className="mo on"}
$("bEdX").addEventListener("click",()=>$("moEd").className="mo");
$("bEdOk").addEventListener("click",async()=>{const id=$("edId").value,data={name:$("edNm").value.trim(),fish:$("edFi").value,size:parseFloat($("edSz").value),dt:$("edDT").value,memo:$("edMe").value.trim()};if(data.dt)data.time=data.dt.split("T")[1];await fbUpdate("catches",id,data);$("moEd").className="mo";await loadData();renderMem();toast(L.tSaved)});

function renderEv(){let h="";events.forEach(ev=>{const sb=ev.st==="active"?'<span class="badge b-act">'+L.active+'</span>':'<span class="badge b-cls">'+L.closed+'</span>';h+='<div class="ev-i"><div class="et">'+ev.name+" "+sb+'</div><div class="ed">📍 '+(ev.place||"-")+" ｜ 📅 "+ev.date+'</div><div class="ea">';if(ev.st==="active")h+='<button class="btn btn-w btn-sm" data-cls="'+ev.id+'">'+L.close+'</button>';else h+='<button class="btn btn-b btn-sm" data-opn="'+ev.id+'">'+L.reopen+'</button><button class="btn btn-d btn-sm" data-del="'+ev.id+'">'+L.del+'</button>';h+="</div></div>"});$("evList").innerHTML=h||'<div style="text-align:center;padding:30px;color:#999">'+L.noData+"</div>";
document.querySelectorAll("[data-cls]").forEach(b=>b.addEventListener("click",async function(){if(confirm(L.confirmClose)){await fbUpdate("events",this.getAttribute("data-cls"),{st:"closed"});await loadData();renderEv();updSel();toast(L.tClosedEv)}}));
document.querySelectorAll("[data-opn]").forEach(b=>b.addEventListener("click",async function(){await fbUpdate("events",this.getAttribute("data-opn"),{st:"active"});await loadData();renderEv();updSel();toast(L.tReopened)}));
document.querySelectorAll("[data-del]").forEach(b=>b.addEventListener("click",async function(){if(confirm(L.confirmDelete)){await fbDelete("events",this.getAttribute("data-del"));await loadData();renderEv();updSel();toast(L.tDeleted)}}));
}

$("bNewEv").addEventListener("click",()=>$("moNe").className="mo on");
$("bNeX").addEventListener("click",()=>$("moNe").className="mo");
$("bNeOk").addEventListener("click",async()=>{const nm=$("neNm").value.trim(),dt=$("neDt").value,pl=$("nePl").value.trim();if(!nm||!dt){toast(L.tSelectEv);return}await fbAdd("events",{name:nm,date:dt,place:pl,st:"active"});$("moNe").className="mo";$("neNm").value="";$("neDt").value="";$("nePl").value="";await loadData();renderEv();updSel();toast(L.tCreated)});

$("bSvPw").addEventListener("click",async()=>{const p=$("iPwCh").value.trim();if(!p){toast(L.tEnterPw);return}await setDoc(doc(db,"settings","admin"),{pw:p});$("iPwCh").value="";toast(L.tPwChanged)});

const savedLang=localStorage.getItem("fishLang");
if(savedLang){L=LANG[savedLang];$("langPage").classList.add("hide");$("appWrap").classList.remove("hide");applyLang();startApp()}
$("langJa").addEventListener("click",()=>{localStorage.setItem("fishLang","ja");L=LANG.ja;$("langPage").classList.add("hide");$("appWrap").classList.remove("hide");applyLang();startApp()});
$("langEn").addEventListener("click",()=>{localStorage.setItem("fishLang","en");L=LANG.en;$("langPage").classList.add("hide");$("appWrap").classList.remove("hide");applyLang();startApp()});

async function startApp(){
await loadData();
if(currentUser&&users.find(u=>u.name===currentUser)){showMain()}else{currentUser="";localStorage.removeItem("fishUser6");showLogin()}
}

