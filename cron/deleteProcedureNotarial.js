var cron = require('node-cron');
const ProcedureNotarial = require('../models/ProcedureNotarial')

exports.initScheduledJobs = () => {
    const scheduledJobFunction = cron.schedule('59 23 * * *', async () => {

        let actual_date = new Date();
        let previous_date = new Date();

        actual_date.setHours(actual_date.getHours() - 5);
        actual_date.setHours(23, 59, 59, 0);


        
        previous_date.setHours(previous_date.getHours() - 5);
        previous_date.setDate(previous_date.getDate() - 10);
        previous_date.setHours(0, 0, 0, 0);
        //console.log(previous_date)

        const notarialProcedures = await ProcedureNotarial.find({
            date: { $lte: previous_date}, //, $lte: actual_date 
            state: { $in: ['1', '2', '3', '4'] }
        });
        //console.log(notarialProcedures)

        for await (element of notarialProcedures) {
            await element.remove();
        }

    }, {
        scheduled: true,
        timezone: "America/Bogota"
    })

    scheduledJobFunction.start();
};