const seeder = require('mongoose-seed');
const { genSaltSync, hashSync } = require("bcryptjs");

const salt = genSaltSync(10);

seeder.connect('mongodb://127.0.0.1:27017/tuexpertolegal?directConnection=true', function() {
    seeder.loadModels([
        'models/Internationalization.js',
        'models/User.js',
        'models/Category.js'
    ]);

    seeder.clearModels(['Internationalization', 'User','Category'], function() {
            seeder.populateModels(data, function() {
            seeder.disconnect();
        });
    });
});

var data = [
    {
        'model': 'Internationalization',
        'documents': [
            {
                'code': 'es',
                'name': 'Español',
                'state': true  
            },
            {
                'code': 'en',
                'name': 'Ingles',
                'state': true  
            }
        ]
    },
    {
        'model': 'User',
        'documents': [
            {
                'first_name': 'Administrador',
                'last_name': 'Tus tramites',
                'email': 'admin@tustramites.com',
                'password': hashSync('12345678', salt),
                'verify': true,
                'role': 'ADMINISTRADOR',
                'url_image': ''
            },
            {
                'first_name': 'Cliente',
                'last_name': 'Prueba',
                'email': 'cliente@gmail.com',
                'password': hashSync('12345678', salt),
                'verify': true,
                'role': 'CLIENTE',
                'url_image': ''
            },
            {
                'first_name': 'Asesor',
                'last_name': 'Legal',
                'email': 'asesor@gmail.com',
                'password': hashSync('12345678', salt),
                'verify': true,
                'role': 'ASESOR LEGAL',
                'url_image': ''
            }
        ]
    },
    {
        'model': 'Category',
        'documents': [
            {
                'name': 'Familia',
                'description': 'Descripción Familia'
            },
            {
                'name': 'Inmobiliario',
                'description': 'Descripción Inmobiliario'
            },
            {
                'name': 'Empresarial',
                'description': 'Descripción Empresarial'
            },
            {
                'name': 'Trámites especiales',
                'description': 'Descripción Trámites especiales'
            }
        ]
    }
];
 
