const express = require('express');
const moment = require('moment');
const router = express.Router();

const Url = require('../models/Url');

// @route     GET /:code
// @desc      Redirect to long/original URL

router.get('/:code', async (req, res) => {
  try {
    // procura o código da url curta no banco e guarda os valores na constante url
    const url = await Url.findOne({ friendlyCode: req.params.code });
    if (url) {
      // atualiza o contador de visitas ao link
      await Url.updateOne({ friendlyCode: req.params.code }, { $inc: { visitorCounter: 1 }});
      // testa antes de tudo se o link é válido
      if (url.isValid === true) {
        // Se a função de expirar por contagem de visitas estiver habilitada
        if ( url.expByVisitNumber === true && url.expByTimePeriod === false){
          // Verifica se o link ainda é válido
          if (url.visitorCounter < url.limitVisits) {
            // Envia a url longa para o usuário
            return res.redirect(url.longUrl);
          } else {
            // Invalida o link no banco
            await Url.updateOne({ friendlyCode: req.params.code }, { isValid: false });
            // Avisa o usuário que o link já expirou
            return res.status(410).json('Sorry! Expired link!');
          }
        // Se a função expirar por período de tempo estiver habilitada  
        } else if ( url.expByTimePeriod === true && url.expByVisitNumber === false ) {
          // Verifica se o link está dentro da faixa de validade
          const checkDate = new Date();
          //if (checkDate > url.startDate && checkDate < url.endDate) {
          if (moment(checkDate).isBetween(url.startDate, url.endDate)) {
            // Envia a url longa para o usuário
            return res.redirect(url.longUrl);
          } else {
            return res.status(410).json('Sorry! link not active!');
          }
        // Se as funções número de visitas e periodo de validade estiverm desabilitadas  
        } else if (url.expByTimePeriod === true && url.expByVisitNumber === true) {
          const checkDate = new Date();
          if (url.visitorCounter < url.limitVisits && moment(checkDate).isBetween(url.startDate, url.endDate) ) {
            // Envia a url longa para o usuário
            return res.redirect(url.longUrl);
          } else {
            // Invalida o link no banco
            await Url.updateOne({ friendlyCode: req.params.code }, { isValid: false });
            // Avisa o usuário que o link já expirou
            return res.status(410).json('Sorry! Expired link!');
          }
        
        } else if ( url.expByTimePeriod === false && url.expByVisitNumber === false) {
          return res.redirect(url.longUrl);
        }
      } else {
        // Avisa o usuário que link está expirado
        return res.status(410).json('Sorry! Expired link!');
      }
    } else {
      return res.status(404).json('No url found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
});

module.exports = router;
