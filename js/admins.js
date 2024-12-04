const adminsData = [
    {
        user_name: 'Sathish Shan',
        position: 'cashier',
        password: '1234',
        phone: '0770110323',
        salary: 40000,
        email: 'shan@email.com',
        dob: '01-01-2000',
        address: 'Udawalawa'
    },
    {
        user_name: 'Aarav Nair',
        position: 'manager',
        password: 'manager123',
        phone: '0770456789',
        salary: 80000,
        email: 'aarav.nair@email.com',
        dob: '05-12-1987',
        address: 'Colombo'
    },
    {
        user_name: 'Ishika Perera',
        position: 'cashier',
        password: 'cashier456',
        phone: '0712568974',
        salary: 40000,
        email: 'ishika.perera@email.com',
        dob: '22-03-1995',
        address: 'Kandy'
    },
    {
        user_name: 'Tharun Fernando',
        position: 'cashier',
        password: 'cash001',
        phone: '0775489632',
        salary: 40000,
        email: 'tharun.fernando@email.com',
        dob: '15-06-1998',
        address: 'Galle'
    },
    {
        user_name: 'Meera Senanayake',
        position: 'manager',
        password: 'mgr007',
        phone: '0712345678',
        salary: 85000,
        email: 'meera.senanayake@email.com',
        dob: '09-09-1985',
        address: 'Negombo'
    },
    {
        user_name: 'Kamal Silva',
        position: 'CEO',
        password: 'ceo1234',
        phone: '0771122334',
        salary: 150000,
        email: 'kamal.silva@email.com',
        dob: '19-02-1980',
        address: 'Colombo'
    },
    {
        user_name: 'Nisha Rajapaksa',
        position: 'cashier',
        password: 'cash123',
        phone: '0719876543',
        salary: 40000,
        email: 'nisha.rajapaksa@email.com',
        dob: '25-12-1997',
        address: 'Matara'
    },
    {
        user_name: 'Ravi Jayawardene',
        position: 'cashier',
        password: 'cash456',
        phone: '0712468101',
        salary: 40000,
        email: 'ravi.jayawardene@email.com',
        dob: '17-08-1999',
        address: 'Jaffna'
    },
    {
        user_name: 'Anjali Dias',
        position: 'manager',
        password: 'manager789',
        phone: '0779988776',
        salary: 90000,
        email: 'anjali.dias@email.com',
        dob: '03-04-1988',
        address: 'Kurunegala'
    },
    {
        user_name: 'Sameera Bandara',
        position: 'cashier',
        password: 'cash999',
        phone: '0773344556',
        salary: 40000,
        email: 'sameera.bandara@email.com',
        dob: '29-11-1996',
        address: 'Anuradhapura'
    },
    {
        user_name: 'Dilini Fernando',
        position: 'CEO',
        password: 'boss123',
        phone: '0713456789',
        salary: 160000,
        email: 'dilini.fernando@email.com',
        dob: '14-07-1979',
        address: 'Colombo'
    },
    {
        user_name: 'Praveen Wickramasinghe',
        position: 'cashier',
        password: 'cash012',
        phone: '0711122334',
        salary: 40000,
        email: 'praveen.wickramasinghe@email.com',
        dob: '10-10-2000',
        address: 'Ratnapura'
    },
    {
        user_name: 'Harsha De Silva',
        position: 'manager',
        password: 'mgr123',
        phone: '0772211223',
        salary: 87000,
        email: 'harsha.desilva@email.com',
        dob: '05-05-1984',
        address: 'Gampaha'
    },
    {
        user_name: 'Chamari Perera',
        position: 'cashier',
        password: 'cash777',
        phone: '0719876542',
        salary: 40000,
        email: 'chamari.perera@email.com',
        dob: '28-02-1993',
        address: 'Nuwara Eliya'
    },
    {
        user_name: 'Sanjeewa Karunaratne',
        position: 'manager',
        password: 'mgr345',
        phone: '0779988777',
        salary: 88000,
        email: 'sanjeewa.karunaratne@email.com',
        dob: '12-06-1982',
        address: 'Hambantota'
    },
    {
        user_name: 'Lakshika Silva',
        position: 'cashier',
        password: 'cash888',
        phone: '0715554443',
        salary: 40000,
        email: 'lakshika.silva@email.com',
        dob: '20-03-1994',
        address: 'Trincomalee'
    },
    {
        user_name: 'Asela Jayasinghe',
        position: 'CEO',
        password: 'topboss',
        phone: '0773311222',
        salary: 155000,
        email: 'asela.jayasinghe@email.com',
        dob: '30-01-1975',
        address: 'Colombo'
    },
    {
        user_name: 'Chathura Dias',
        position: 'cashier',
        password: 'cash223',
        phone: '0711234567',
        salary: 40000,
        email: 'chathura.dias@email.com',
        dob: '01-09-1998',
        address: 'Polonnaruwa'
    },
    {
        user_name: 'Nilani Kumari',
        position: 'manager',
        password: 'mgr555',
        phone: '0771122445',
        salary: 88000,
        email: 'nilani.kumari@email.com',
        dob: '17-11-1986',
        address: 'Kalutara'
    },
    {
        user_name: 'Roshan Perera',
        position: 'cashier',
        password: 'cash444',
        phone: '0717779998',
        salary: 40000,
        email: 'roshan.perera@email.com',
        dob: '18-08-1995',
        address: 'Badulla'
    }
];

window.localStorage.setItem("admins", JSON.stringify(adminsData));
