const ProcedureNotarial = require('../models/ProcedureNotarial');
const storage = require('../helpers/storage');
const JSZip = require('jszip');


const show = async function (req, res, next) {
    try {
        const url = req.query.url; //"https://tustramites-public.s3.amazonaws.com/banner/580da914-7a91-417e-b121-2767cac3a39d.png";
        const type = req.query.type || 1;
        const access = req.query.access || 0;

        storage.get(url, access)
            .then((data) => {
                var _length = data.length;

                res.writeHead(200, {
                    'Content-Type': type == 1 ? 'image/png' : 'application/pdf',
                    'Content-Length': _length
                });
                res.end(data);
            })
            .catch((err) => {
                res.status(400).json({
                    code: 'FILE_NO_FOUND',
                    message: 'El archivo no existe.',
                    server: err
                });

            })


    } catch (err) {
        next({
            code: 500,
            message: err.message
        })
    }
}

const download = async function (req, res, next) {
    try {
        const id = req.query.id;

        const procedureNotarial = await ProcedureNotarial.findOne({ _id: id });

        if (procedureNotarial.documents) {
            const zip = new JSZip();

            storage.download(procedureNotarial.documents, 1)
                .then(async (listFile) => {

                    for (var i = 0; i < listFile.length; i++) {
                        const file = listFile[i];
                        await zip.file("file_" + i + ".pdf", file);
                    }

                    const buffer = await zip.generateAsync({ type: "nodebuffer" });
                    res.setHeader('Content-Type', 'application/octet-stream');
                    res.setHeader('Content-disposition', 'attachment; filename="documents.zip"');
                    res.end(buffer);

                })
                .catch((err) => {
                    res.status(400).json({
                        code: 'FILE_NO_FOUND',
                        message: 'El archivo no existe.',
                        server: err
                    });

                })
        }




    } catch (err) {
        next({
            code: 500,
            message: err.message
        })
    }
}

module.exports = {
    show,
    download
}