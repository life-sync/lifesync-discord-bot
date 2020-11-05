const mongoose = require('mongoose')
const reqString = {
    type: String,
    required: true,
  }

const GuildConfigSchema = mongoose.Schema({
    guildId: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique : true, 
    },
    defaultRole: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
    memberLog:{
        type: mongoose.SchemaTypes.String,
        required: false,
    }
})

module.exports = mongoose.model('GuildConfig', GuildConfigSchema)