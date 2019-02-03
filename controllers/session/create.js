
const {Session} = require('../../models');

async function create(ctx) {
    try {

        const {body}=ctx.request;
        
        ctx.body = await Session.create(body);

    } catch(err) {
        if(err.name === 'ValidationError') {
            err.status = 400;
        }
        throw err
    }
}

module.exports = create;
