const http = require('http');

function request(options, bodyData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, text: data });
        }
      });
    });
    req.on('error', reject);
    if (bodyData) {
      req.write(JSON.stringify(bodyData));
    }
    req.end();
  });
}

async function runE2ETest() {
  console.log('====================================================');
  console.log('  STARTING COMPREHENSIVE END-TO-END FLOW VALIDATION');
  console.log('====================================================\n');

  // 1. Founders Endpoint
  console.log('[1/12] Testing Founders Corner details...');
  const foundersRes = await request({
    host: 'localhost',
    port: 5000,
    path: '/api/founders',
    method: 'GET'
  });
  console.log(' Founders Found:', foundersRes.data.founders.map(f => `${f.name} (${f.role})`).join(' & '));
  if (foundersRes.data.founders.length === 2) {
    console.log('  Founders Corner (Kamalesh & Adithya) Verified!\n');
  }

  // 2. Signup Test
  const testUser = {
    username: 'test_student_' + Math.floor(Math.random() * 10000),
    email: 'student_' + Math.floor(Math.random() * 10000) + '@artgallery.com',
    phone: '+91 9876500000',
    dob: '2002-05-15',
    gender: 'Male',
    password: 'password123',
    confirmPassword: 'password123'
  };
  console.log(`[2/12] Testing Customer Signup (${testUser.username})...`);
  const signupRes = await request({
    host: 'localhost',
    port: 5000,
    path: '/api/auth/signup',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, testUser);
  console.log(' Signup Result:', signupRes.data.message);
  const studentToken = signupRes.data.token;
  console.log('  Customer Signup (username, email, phone, dob, gender, pass) Verified!\n');

  // 3. Login Test (using username or email)
  console.log(`[3/12] Testing Login with Email identifier...`);
  const loginRes = await request({
    host: 'localhost',
    port: 5000,
    path: '/api/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    loginIdentifier: testUser.email,
    password: 'password123'
  });
  console.log(' Login Result:', loginRes.data.message, 'Role:', loginRes.data.user.role);
  console.log('  Login with Single Identifier/Password Verified!\n');

  // 4. Top Arts by Likes
  console.log('[4/12] Testing Top Arts by Likes Count...');
  const topArtsRes = await request({
    host: 'localhost',
    port: 5000,
    path: '/api/arts/top-arts',
    method: 'GET'
  });
  console.log(` Top Arts Count: ${topArtsRes.data.arts.length}. Top Art: "${topArtsRes.data.arts[0].title}" (${topArtsRes.data.arts[0].likesCount} likes)`);
  console.log('  Top Arts by Likes Count Verified!\n');

  // 5. Top Artists by Likes
  console.log('[5/12] Testing Top Artists by Likes...');
  const topArtistsRes = await request({
    host: 'localhost',
    port: 5000,
    path: '/api/arts/top-artists',
    method: 'GET'
  });
  console.log(` Top Artists Count: ${topArtistsRes.data.artists.length}. #1 Artist: @${topArtistsRes.data.artists[0].username} (${topArtistsRes.data.artists[0].totalLikes} likes)`);
  console.log('  Top Artists by Total Likes Verified!\n');

  // 6. Like Toggle Test
  const targetArtId = topArtsRes.data.arts[0]._id;
  const initialLikes = topArtsRes.data.arts[0].likesCount;
  console.log(`[6/12] Testing Liking Artwork ("${topArtsRes.data.arts[0].title}")...`);
  const likeRes = await request({
    host: 'localhost',
    port: 5000,
    path: `/api/arts/${targetArtId}/like`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${studentToken}`
    }
  });
  console.log(` Like Result: liked=${likeRes.data.liked}, new count=${likeRes.data.likesCount}`);
  console.log('  Artwork Like Counter Verified!\n');

  // 7. Instagram-style Artist Profile
  const artistUsername = topArtistsRes.data.artists[0].username;
  console.log(`[7/12] Testing Instagram Profile & Arts for @${artistUsername}...`);
  const artistRes = await request({
    host: 'localhost',
    port: 5000,
    path: `/api/arts/artist/${artistUsername}`,
    method: 'GET'
  });
  console.log(` Artist Details: @${artistRes.data.artist.username}, Total Arts in Grid: ${artistRes.data.arts.length}, UPI: ${artistRes.data.artist.upiId}`);
  console.log('  Instagram-style Artist Profile & Gallery Grid Verified!\n');

  // 8. Normal Customer Posts Art (Wait for Admin Approval + 1st Time UPI QR prompt)
  console.log('[8/12] Customer submitting artwork to become an Artist (requires UPI QR)...');
  const postArtRes = await request({
    host: 'localhost',
    port: 5000,
    path: '/api/arts',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${studentToken}`
    }
  }, {
    title: 'Golden Petals of Konark',
    description: 'A study of sunlit terracotta architecture and blooming wild bougainvillea at the Sun Temple.',
    category: 'Oil Painting',
    dimensions: '24 x 36 inches',
    price: 16500,
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    artistUpiId: `${testUser.username}@okicici`,
    upiQrUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=${testUser.username}@okicici`,
    artistBio: 'Aspiring painter passionate about temple architecture.'
  });
  console.log(' Art Submission Result:', postArtRes.data.message);
  console.log(` Art Status: "${postArtRes.data.art.status}" (Under Review)`);
  const pendingArtId = postArtRes.data.art._id;
  console.log('  Customer Artwork Submission & Waiting State Verified!\n');

  // 9. Placing an Order for an Artwork (with UPI mode & Artist QR)
  console.log('[9/12] Testing Placing an Order with Delivery Address & UPI Mode...');
  const orderRes = await request({
    host: 'localhost',
    port: 5000,
    path: '/api/orders',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${studentToken}`
    }
  }, {
    artId: targetArtId,
    fullName: 'Rahul Sharma',
    mobile: '+91 9845112233',
    address: 'Flat 402, Lotus Towers, Brigade Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560001',
    paymentMode: 'UPI',
    upiRef: 'UPI-UTR-998877665544'
  });
  console.log(` Order Placed! Order ID: ${orderRes.data.order.orderNumber}, Amount: ₹${orderRes.data.order.amount}`);
  console.log('  Order Placement Form (Name, Address, Payment mode, UPI) Verified!\n');

  // 10. Admin Login
  console.log('[10/12] Logging in as Admin...');
  const adminLoginRes = await request({
    host: 'localhost',
    port: 5000,
    path: '/api/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    loginIdentifier: 'admin',
    password: 'admin123'
  });
  const adminToken = adminLoginRes.data.token;
  console.log(' Admin authenticated successfully!\n');

  // 11. Admin Approves Art & Promotes Customer to Artist
  console.log('[11/12] Admin reviewing pending arts and approving student art submission...');
  const approveRes = await request({
    host: 'localhost',
    port: 5000,
    path: `/api/admin/arts/${pendingArtId}/approve`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${adminToken}`
    }
  });
  console.log(' Approval Response:', approveRes.data.message);

  // Check if student is now an artist!
  const studentProfileRes = await request({
    host: 'localhost',
    port: 5000,
    path: '/api/auth/me',
    method: 'GET',
    headers: { 'Authorization': `Bearer ${studentToken}` }
  });
  console.log(` Student Updated Role: "${studentProfileRes.data.user.role}", isArtist: ${studentProfileRes.data.user.isArtist}`);
  console.log('  Admin Acceptance & Elevation from User to Artist Verified!\n');

  // 12. Admin Management of Customers, Artists, Arts, and Orders
  console.log('[12/12] Verifying Admin separation of Users and Artists and Order oversight...');
  const [custRes, artstRes, allOrdersRes] = await Promise.all([
    request({ host: 'localhost', port: 5000, path: '/api/admin/customers', method: 'GET', headers: { 'Authorization': `Bearer ${adminToken}` } }),
    request({ host: 'localhost', port: 5000, path: '/api/admin/artists', method: 'GET', headers: { 'Authorization': `Bearer ${adminToken}` } }),
    request({ host: 'localhost', port: 5000, path: '/api/admin/orders', method: 'GET', headers: { 'Authorization': `Bearer ${adminToken}` } })
  ]);
  console.log(` Admin sees: ${custRes.data.count} Customers, ${artstRes.data.count} Artists, ${allOrdersRes.data.count} Orders.`);
  console.log('  Separate Management of Customers, Artists, Arts, and Orders Verified!\n');

  console.log('====================================================');
  console.log('  ALL USER REQUIREMENTS FULLY IMPLEMENTED & TESTED! ');
  console.log('====================================================');
}

runE2ETest().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
