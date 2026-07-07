
import { Amplify } from 'aws-amplify';
import { signIn, signUp, signOut, getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/data';
import { uploadData, getUrl } from 'aws-amplify/storage';
import outputs from '../amplify_outputs.json';

Amplify.configure(outputs);
const client = generateClient();

var currentUser = null;
var currentAttrs = null;
var isAdmin = false;
var currentTab = 'submit';
var selectedPhoto = null;

async function checkAuth() {
    try {
        currentUser = await getCurrentUser();
        currentAttrs = await fetchUserAttributes();
        var groups = [];
        try {
            const session = await import('aws-amplify/auth');
            const tokens = await session.fetchAuthSession();
            groups = tokens.tokens?.accessToken?.payload['cognito:groups'] || [];
        } catch(e) {}
        isAdmin = groups.includes('admin');
        showApp();
    } catch {
        showLogin();
    }
}

function showLogin() {
    document.getElementById('app').innerHTML = '<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#1a73e8,#0d47a1);padding:20px;font-family:-apple-system,BlinkMacSystemFont,sans-serif;">'
        + '<div style="background:white;border-radius:18px;padding:32px 24px;width:100%;max-width:380px;">'
        + '<div style="text-align:center;margin-bottom:20px;"><div style="font-size:42px;">&#x1F3A3;</div>'
        + '<h2 style="margin:8px 0 4px;">Fishing Tournament</h2>'
        + '<p style="color:#999;font-size:12px;">Login or Sign Up</p></div>'
        + '<div id="authForm">'
        + '<div id="authError" style="display:none;background:#ffebee;color:#d32f2f;padding:8px;border-radius:8px;font-size:12px;margin-bottom:12px;"></div>'
        + '<input id="emailInput" type="email" placeholder="Email" style="width:100%;padding:12px;border:1.5px solid #ddd;border-radius:9px;margin-bottom:10px;font-size:14px;box-sizing:border-box;">'
        + '<input id="passInput" type="password" placeholder="Password (8+ chars)" style="width:100%;padding:12px;border:1.5px solid #ddd;border-radius:9px;margin-bottom:10px;font-size:14px;box-sizing:border-box;">'
        + '<div id="nicknameField" style="display:none;"><input id="nickInput" type="text" placeholder="Nickname (public name)" style="width:100%;padding:12px;border:1.5px solid #ddd;border-radius:9px;margin-bottom:10px;font-size:14px;box-sizing:border-box;"></div>'
        + '<div id="confirmField" style="display:none;"><input id="codeInput" type="text" placeholder="Confirmation code" style="width:100%;padding:12px;border:1.5px solid #ddd;border-radius:9px;margin-bottom:10px;font-size:14px;box-sizing:border-box;">'
        + '<button onclick="confirmSignUp()" style="width:100%;padding:12px;background:#2e7d32;color:white;border:none;border-radius:9px;font-size:14px;font-weight:600;cursor:pointer;">Submit Code</button></div>'
        + '<div id="loginBtns"><button onclick="doLogin()" style="width:100%;padding:12px;background:linear-gradient(135deg,#1a73e8,#0d47a1);color:white;border:none;border-radius:9px;font-size:14px;font-weight:600;cursor:pointer;margin-bottom:8px;">Login</button>'
        + '<button onclick="showRegister()" style="width:100%;padding:12px;background:#f5f5f5;color:#666;border:none;border-radius:9px;font-size:14px;cursor:pointer;">Sign Up</button></div>'
        + '<div id="registerBtns" style="display:none;"><button onclick="doRegister()" style="width:100%;padding:12px;background:linear-gradient(135deg,#2e7d32,#1b5e20);color:white;border:none;border-radius:9px;font-size:14px;font-weight:600;cursor:pointer;margin-bottom:8px;">Create Account</button>'
        + '<button onclick="showLoginForm()" style="width:100%;padding:12px;background:#f5f5f5;color:#666;border:none;border-radius:9px;font-size:14px;cursor:pointer;">Back to Login</button></div>'
        + '</div></div></div>';
}

function showApp() {
    var nickname = currentAttrs.preferred_username || currentUser.username;
    var adminTab = isAdmin ? '<button onclick="switchTab(\'admin\')" id="tabAdmin" style="flex:1;padding:10px;border:none;background:none;font-size:12px;font-weight:600;color:#666;cursor:pointer;border-bottom:3px solid transparent;">Admin</button>' : '';
    document.getElementById('app').innerHTML = '<div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;">'
        + '<div style="background:linear-gradient(135deg,#1a73e8,#0d47a1);color:white;padding:16px 20px;">'
        + '<div style="display:flex;justify-content:space-between;align-items:center;"><div>'
        + '<h1 style="margin:0;font-size:18px;">&#x1F3A3; Fishing Tournament</h1>'
        + '<p style="margin:4px 0 0;font-size:12px;opacity:0.9;">Welcome, ' + nickname + ' ' + (isAdmin ? '(Admin)' : '') + '</p></div>'
        + '<button onclick="doLogout()" style="padding:6px 12px;background:rgba(255,255,255,0.2);color:white;border:none;border-radius:8px;font-size:11px;cursor:pointer;">Logout</button></div></div>'
        + '<div style="display:flex;background:white;border-bottom:1px solid #e0e0e0;">'
        + '<button onclick="switchTab(\'submit\')" id="tabSubmit" style="flex:1;padding:10px;border:none;background:none;font-size:12px;font-weight:600;color:#1a73e8;cursor:pointer;border-bottom:3px solid #1a73e8;">Submit</button>'
        + '<button onclick="switchTab(\'ranking\')" id="tabRanking" style="flex:1;padding:10px;border:none;background:none;font-size:12px;font-weight:600;color:#666;cursor:pointer;border-bottom:3px solid transparent;">Ranking</button>'
        + adminTab + '</div>'
        + '<div id="tabContent" style="max-width:540px;margin:0 auto;padding:16px;"></div></div>';
    switchTab('submit');
}

window.switchTab = function(tab) {
    currentTab = tab;
    document.querySelectorAll('[id^="tab"]').forEach(function(el) {
        if (el.id.startsWith('tabContent')) return;
        el.style.color = '#666';
        el.style.borderBottom = '3px solid transparent';
    });
    var activeEl = document.getElementById('tab' + tab.charAt(0).toUpperCase() + tab.slice(1));
    if (activeEl) { activeEl.style.color = '#1a73e8'; activeEl.style.borderBottom = '3px solid #1a73e8'; }
    if (tab === 'submit') showSubmitTab();
    else if (tab === 'ranking') showRankingTab();
    else if (tab === 'admin') showAdminTab();
};

function showSubmitTab() {
    document.getElementById('tabContent').innerHTML = '<div style="background:white;border-radius:13px;padding:16px;margin-bottom:12px;box-shadow:0 2px 6px rgba(0,0,0,0.06);">'
        + '<h3 style="margin:0 0 14px;font-size:15px;">&#x1F41F; Submit Catch</h3>'
        + '<div style="margin-bottom:10px;"><label style="display:block;font-size:12px;font-weight:600;color:#555;margin-bottom:4px;">Fish Type</label>'
        + '<select id="fishType" style="width:100%;padding:10px;border:1.5px solid #ddd;border-radius:9px;font-size:14px;box-sizing:border-box;">'
        + '<option value="">Select...</option><option value="Largemouth Bass">Largemouth Bass</option><option value="Smallmouth Bass">Smallmouth Bass</option></select></div>'
        + '<div style="margin-bottom:10px;"><label style="display:block;font-size:12px;font-weight:600;color:#555;margin-bottom:4px;">Length (cm)</label>'
        + '<input id="fishLength" type="number" step="0.1" min="0" placeholder="e.g. 45.5" style="width:100%;padding:10px;border:1.5px solid #ddd;border-radius:9px;font-size:14px;box-sizing:border-box;"></div>'
        + '<div style="margin-bottom:10px;"><label style="display:block;font-size:12px;font-weight:600;color:#555;margin-bottom:4px;">Photo (fish on ruler)</label>'
        + '<input id="photoInput" type="file" accept="image/*" capture="environment" onchange="previewPhoto(this)" style="width:100%;font-size:13px;box-sizing:border-box;">'
        + '<img id="photoPreview" style="display:none;width:100%;max-height:200px;object-fit:contain;margin-top:8px;border-radius:8px;"></div>'
        + '<div style="margin-bottom:10px;"><label style="display:block;font-size:12px;font-weight:600;color:#555;margin-bottom:4px;">Memo (optional)</label>'
        + '<input id="memo" type="text" placeholder="e.g. Caught with crankbait" style="width:100%;padding:10px;border:1.5px solid #ddd;border-radius:9px;font-size:14px;box-sizing:border-box;"></div>'
        + '<button onclick="submitEntry()" style="width:100%;padding:12px;background:linear-gradient(135deg,#1a73e8,#0d47a1);color:white;border:none;border-radius:9px;font-size:14px;font-weight:600;cursor:pointer;">Submit</button>'
        + '<div id="submitMsg" style="margin-top:10px;font-size:12px;text-align:center;"></div></div>'
        + '<div style="background:white;border-radius:13px;padding:16px;box-shadow:0 2px 6px rgba(0,0,0,0.06);">'
        + '<h3 style="margin:0 0 14px;font-size:15px;">&#x1F4CB; Your Submissions</h3>'
        + '<div id="entryList" style="font-size:13px;color:#666;">Loading...</div></div>';
    loadEntries();
}

window.previewPhoto = function(input) {
    if (input.files && input.files[0]) {
        selectedPhoto = input.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            var img = document.getElementById('photoPreview');
            img.src = e.target.result;
            img.style.display = 'block';
        };
        reader.readAsDataURL(input.files[0]);
    }
};

async function showRankingTab() {
    document.getElementById('tabContent').innerHTML = '<div style="background:white;border-radius:13px;padding:16px;box-shadow:0 2px 6px rgba(0,0,0,0.06);">'
        + '<h3 style="margin:0 0 14px;font-size:15px;">&#x1F3C6; Ranking</h3>'
        + '<div id="rankingList" style="font-size:13px;color:#666;">Loading...</div></div>';
    try {
        const { data } = await client.models.Entry.list({ filter: { status: { eq: 'approved' } } });
        var players = {};
        data.forEach(function(entry) {
            if (!players[entry.oddsId]) { players[entry.oddsId] = { nickname: entry.oddsNickname, lengths: [] }; }
            players[entry.oddsId].lengths.push(entry.approvedLength || entry.selfLength);
        });
        var ranking = Object.values(players).map(function(p) {
            p.lengths.sort(function(a, b) { return b - a; });
            var top3 = p.lengths.slice(0, 3);
            var total = top3.reduce(function(s, v) { return s + v; }, 0);
            return { nickname: p.nickname, total: total, best: p.lengths[0], count: p.lengths.length };
        });
        ranking.sort(function(a, b) { return b.total - a.total || b.best - a.best; });
        var el = document.getElementById('rankingList');
        if (ranking.length === 0) { el.innerHTML = '<p style="text-align:center;color:#999;">No approved entries yet</p>'; return; }
        var html = '';
        ranking.forEach(function(r, i) {
            var medal = i === 0 ? '&#x1F947;' : i === 1 ? '&#x1F948;' : i === 2 ? '&#x1F949;' : (i + 1);
            html += '<div style="display:flex;align-items:center;padding:10px 0;border-bottom:1px solid #f0f0f0;">';
            html += '<div style="width:32px;font-size:16px;text-align:center;">' + medal + '</div>';
            html += '<div style="flex:1;"><div style="font-weight:600;">' + r.nickname + '</div><div style="font-size:11px;color:#999;">' + r.count + ' fish</div></div>';
            html += '<div style="text-align:right;"><div style="font-weight:700;color:#2e7d32;">' + r.total.toFixed(1) + ' cm</div><div style="font-size:11px;color:#999;">Best: ' + r.best.toFixed(1) + '</div></div></div>';
        });
        el.innerHTML = html;
    } catch(e) { document.getElementById('rankingList').innerHTML = '<p style="color:#d32f2f;">Error loading ranking</p>'; }
}

async function showAdminTab() {
    document.getElementById('tabContent').innerHTML = '<div style="background:white;border-radius:13px;padding:16px;box-shadow:0 2px 6px rgba(0,0,0,0.06);">'
        + '<h3 style="margin:0 0 14px;font-size:15px;">&#x1F4CF; Pending Approvals</h3>'
        + '<div id="adminList" style="font-size:13px;color:#666;">Loading...</div></div>'
        + '<div style="background:white;border-radius:13px;padding:16px;margin-top:12px;box-shadow:0 2px 6px rgba(0,0,0,0.06);">'
        + '<h3 style="margin:0 0 14px;font-size:15px;">&#x2705; Approved</h3>'
        + '<div id="approvedList" style="font-size:13px;color:#666;">Loading...</div></div>'
        + '<div style="background:white;border-radius:13px;padding:16px;margin-top:12px;box-shadow:0 2px 6px rgba(0,0,0,0.06);">'
        + '<h3 style="margin:0 0 14px;font-size:15px;">&#x274C; Rejected</h3>'
        + '<div id="rejectedList" style="font-size:13px;color:#666;">Loading...</div></div>';
    try {
        const { data } = await client.models.Entry.list();
        var pending = data.filter(function(e) { return e.status === 'pending'; });
        var approved = data.filter(function(e) { return e.status === 'approved'; });
        var rejected = data.filter(function(e) { return e.status === 'rejected'; });

        var adminEl = document.getElementById('adminList');
        if (pending.length === 0) { adminEl.innerHTML = '<p style="text-align:center;color:#999;">No pending entries</p>'; }
        else {
            var html = '';
            pending.forEach(function(entry) {
                html += '<div id="entry-' + entry.id + '" style="padding:12px 0;border-bottom:1px solid #f0f0f0;">';
                html += '<div style="display:flex;justify-content:space-between;align-items:center;">';
                html += '<div><div style="font-weight:600;">' + entry.oddsNickname + '</div>';
                html += '<div style="font-size:12px;color:#666;">' + entry.fishType + ' - ' + entry.selfLength + ' cm</div>';
                html += '<div style="font-size:11px;color:#999;">' + (entry.memo || '') + '</div></div>';
                html += '<span style="font-size:10px;padding:3px 8px;border-radius:12px;background:#fff3e0;color:#f57c00;font-weight:600;">Pending</span></div>';
                if (entry.photoKey) {
                    html += '<div style="margin-top:8px;"><img id="photo-' + entry.id + '" style="width:100%;max-height:200px;object-fit:contain;border-radius:8px;background:#f5f5f5;" src="" alt="Loading..."></div>';
                }
                html += '<div style="margin-top:8px;">';
                html += '<input id="corrected-' + entry.id + '" type="number" step="0.1" placeholder="Corrected length (optional)" style="width:100%;padding:8px;border:1.5px solid #ddd;border-radius:7px;font-size:13px;margin-bottom:6px;box-sizing:border-box;">';
                html += '<input id="reason-' + entry.id + '" type="text" placeholder="Reject reason (optional)" style="width:100%;padding:8px;border:1.5px solid #ddd;border-radius:7px;font-size:13px;margin-bottom:6px;box-sizing:border-box;">';
                html += '<div style="display:flex;gap:6px;">';
                html += '<button onclick="approveEntry(\'' + entry.id + '\')" style="flex:1;padding:8px;background:#2e7d32;color:white;border:none;border-radius:7px;font-size:12px;font-weight:600;cursor:pointer;">Approve</button>';
                html += '<button onclick="rejectEntry(\'' + entry.id + '\')" style="padding:8px 12px;background:#ffebee;color:#d32f2f;border:1.5px solid #ef9a9a;border-radius:7px;font-size:12px;font-weight:600;cursor:pointer;">Reject</button>';
                html += '</div></div></div>';
            });
            adminEl.innerHTML = html;
            pending.forEach(function(entry) {
                if (entry.photoKey) { loadPhoto(entry.id, entry.photoKey); }
            });
        }

        var appEl = document.getElementById('approvedList');
        if (approved.length === 0) { appEl.innerHTML = '<p style="text-align:center;color:#999;">No approved entries yet</p>'; }
        else {
            var ahtml = '';
            approved.forEach(function(entry) {
                ahtml += '<div style="padding:10px 0;border-bottom:1px solid #f0f0f0;">';
                ahtml += '<div style="display:flex;justify-content:space-between;align-items:center;">';
                ahtml += '<div><div style="font-weight:600;">' + entry.oddsNickname + '</div><div style="font-size:11px;color:#999;">' + entry.fishType + '</div></div>';
                ahtml += '<div style="text-align:right;"><div style="font-weight:700;color:#2e7d32;">' + (entry.approvedLength || entry.selfLength).toFixed(1) + ' cm</div></div></div>';
                if (entry.photoKey) {
                    ahtml += '<div style="margin-top:8px;"><img id="approved-photo-' + entry.id + '" style="width:100%;max-height:200px;object-fit:contain;border-radius:8px;background:#f5f5f5;" src="" alt="Loading..."></div>';
                }
                ahtml += '</div>';
            });
            appEl.innerHTML = ahtml;
            approved.forEach(function(entry) {
                if (entry.photoKey) { loadApprovedPhoto(entry.id, entry.photoKey); }
            });
        }

        var rejEl = document.getElementById('rejectedList');
        if (rejected.length === 0) { rejEl.innerHTML = '<p style="text-align:center;color:#999;">No rejected entries</p>'; }
        else {
            var rhtml = '';
            rejected.forEach(function(entry) {
                rhtml += '<div style="padding:8px 0;border-bottom:1px solid #f0f0f0;">';
                rhtml += '<div style="display:flex;justify-content:space-between;align-items:center;">';
                rhtml += '<div><div style="font-weight:600;">' + entry.oddsNickname + '</div><div style="font-size:11px;color:#999;">' + entry.fishType + ' - ' + entry.selfLength + ' cm</div></div>';
                rhtml += '<span style="font-size:10px;padding:3px 8px;border-radius:12px;background:#ffebee;color:#d32f2f;font-weight:600;">Rejected</span></div>';
                if (entry.rejectReason) { rhtml += '<div style="font-size:11px;color:#d32f2f;margin-top:4px;">Reason: ' + entry.rejectReason + '</div>'; }
                rhtml += '</div>';
            });
            rejEl.innerHTML = rhtml;
        }
    } catch(e) { document.getElementById('adminList').innerHTML = '<p style="color:#d32f2f;">Error: ' + e.message + '</p>'; }
}

async function loadPhoto(entryId, photoKey) {
    try {
        var result = await getUrl({ path: photoKey });
        var img = document.getElementById('photo-' + entryId);
        if (img) img.src = result.url.toString();
    } catch(e) {
        var img2 = document.getElementById('photo-' + entryId);
        if (img2) img2.alt = 'Photo not available';
    }
}

async function loadApprovedPhoto(entryId, photoKey) {
    try {
        var result = await getUrl({ path: photoKey });
        var img = document.getElementById('approved-photo-' + entryId);
        if (img) img.src = result.url.toString();
    } catch(e) {
        var img2 = document.getElementById('approved-photo-' + entryId);
        if (img2) img2.alt = 'Photo not available';
    }
}

async function loadEntries() {
    try {
        const { data } = await client.models.Entry.list({ filter: { oddsId: { eq: currentUser.userId } } });
        var list = document.getElementById('entryList');
        if (data.length === 0) { list.innerHTML = '<p style="color:#999;text-align:center;">No submissions yet</p>'; return; }
        var html = '';
        data.sort(function(a, b) { return new Date(b.createdAt) - new Date(a.createdAt); });
        data.forEach(function(entry) {
            var statusColor = entry.status === 'approved' ? '#2e7d32' : entry.status === 'rejected' ? '#d32f2f' : '#f57c00';
            var statusText = entry.status === 'approved' ? 'Approved' : entry.status === 'rejected' ? 'Rejected' : 'Pending';
            var rejectInfo = entry.rejectReason ? '<div style="font-size:10px;color:#d32f2f;margin-top:2px;">Reason: ' + entry.rejectReason + '</div>' : '';
            html += '<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid #f0f0f0;">';
            html += '<div><div style="font-weight:600;color:#333;">' + entry.selfLength + ' cm</div>';
            html += '<div style="font-size:11px;color:#999;">' + entry.fishType + ' - ' + (entry.memo || '') + '</div>' + rejectInfo + '</div>';
            html += '<span style="font-size:10px;padding:3px 8px;border-radius:12px;font-weight:600;color:' + statusColor + ';background:' + statusColor + '15;">' + statusText + '</span></div>';
        });
        list.innerHTML = html;
    } catch (e) { document.getElementById('entryList').innerHTML = '<p style="color:#d32f2f;">Error loading data</p>'; }
}

window.submitEntry = async function() {
    var fishType = document.getElementById('fishType').value;
    var fishLength = parseFloat(document.getElementById('fishLength').value);
    var memo = document.getElementById('memo').value;
    var msgEl = document.getElementById('submitMsg');
    if (!fishType) { msgEl.innerHTML = '<span style="color:#d32f2f;">Please select fish type</span>'; return; }
    if (!fishLength || fishLength <= 0) { msgEl.innerHTML = '<span style="color:#d32f2f;">Please enter length</span>'; return; }
    msgEl.innerHTML = '<span style="color:#666;">Submitting...</span>';
    try {
        var photoKey = '';
        if (selectedPhoto) {
            var ext = selectedPhoto.name.split('.').pop();
            var fileName = 'photos/' + Date.now() + '-' + Math.random().toString(36).substring(7) + '.' + ext;
            await uploadData({ path: fileName, data: selectedPhoto, options: { contentType: selectedPhoto.type } });
            photoKey = fileName;
        }
        await client.models.Entry.create({
            oddsId: currentUser.userId,
            oddsNickname: currentAttrs.preferred_username || currentUser.username,
            tournamentId: 'tournament-001',
            fishType: fishType,
            selfLength: fishLength,
            memo: memo,
            status: 'pending',
            photoKey: photoKey
        });
        msgEl.innerHTML = '<span style="color:#2e7d32;">Submitted successfully!</span>';
        document.getElementById('fishType').value = '';
        document.getElementById('fishLength').value = '';
        document.getElementById('memo').value = '';
        document.getElementById('photoPreview').style.display = 'none';
        document.getElementById('photoInput').value = '';
        selectedPhoto = null;
        loadEntries();
    } catch (e) { msgEl.innerHTML = '<span style="color:#d32f2f;">Error: ' + e.message + '</span>'; }
};

window.approveEntry = async function(id) {
    var correctedEl = document.getElementById('corrected-' + id);
    var corrected = correctedEl ? parseFloat(correctedEl.value) : null;
    try {
        var updateData = { id: id, status: 'approved' };
        if (corrected && corrected > 0) updateData.approvedLength = corrected;
        await client.models.Entry.update(updateData);
        showAdminTab();
    } catch(e) { alert('Error: ' + e.message); }
};

window.rejectEntry = async function(id) {
    var reasonEl = document.getElementById('reason-' + id);
    var reason = reasonEl ? reasonEl.value : '';
    try {
        await client.models.Entry.update({ id: id, status: 'rejected', rejectReason: reason });
        showAdminTab();
    } catch(e) { alert('Error: ' + e.message); }
};

window.doLogin = async function() {
    var email = document.getElementById('emailInput').value;
    var pass = document.getElementById('passInput').value;
    try {
        await signIn({ username: email, password: pass });
        checkAuth();
    } catch(e) { showError(e.message); }
};

window.doRegister = async function() {
    var email = document.getElementById('emailInput').value;
    var pass = document.getElementById('passInput').value;
    var nick = document.getElementById('nickInput').value;
    if(!nick){ showError('Please enter a nickname'); return; }
    try {
        await signUp({ username: email, password: pass, options: { userAttributes: { preferred_username: nick } } });
        document.getElementById('loginBtns').style.display='none';
        document.getElementById('registerBtns').style.display='none';
        document.getElementById('nicknameField').style.display='none';
        document.getElementById('confirmField').style.display='block';
    } catch(e) { showError(e.message); }
};

window.confirmSignUp = async function() {
    var email = document.getElementById('emailInput').value;
    var code = document.getElementById('codeInput').value;
    try {
        const { confirmSignUp } = await import('aws-amplify/auth');
        await confirmSignUp({ username: email, confirmationCode: code });
        alert('Registration complete! Please login.');
        showLogin();
    } catch(e) { showError(e.message); }
};

window.showRegister = function() {
    document.getElementById('nicknameField').style.display='block';
    document.getElementById('loginBtns').style.display='none';
    document.getElementById('registerBtns').style.display='block';
};

window.showLoginForm = function() {
    document.getElementById('nicknameField').style.display='none';
    document.getElementById('loginBtns').style.display='block';
    document.getElementById('registerBtns').style.display='none';
};

window.doLogout = async function() {
    await signOut();
    showLogin();
};

function showError(msg) {
    var el = document.getElementById('authError');
    el.textContent = msg;
    el.style.display = 'block';
}

checkAuth();

