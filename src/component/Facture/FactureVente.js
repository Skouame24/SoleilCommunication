import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Facture.css';
import { format } from 'date-fns';
import logo from '../../assets/logo.jpeg';
import html2pdf from 'html2pdf.js';



const formatNumeroFacture = (id) => {
  return `FACT-${id.toString().padStart(3, '0')}`;
};



const FactureVente = () => {
    const { venteId } = useParams(); // Assurez-vous que le nom du paramètre correspond à ce qui est utilisé dans les routes
  console.log(venteId)
  const [venteDetails, setVenteDetails] = useState([]);
  const [articleMap, setArticleMap] = useState({}); // Tableau pour stocker les articles par ID

  useEffect(() => {
    // Récupérer les détails de la vente depuis l'API
    axios.get(`http://localhost:5001/api/ventes/${venteId}`)
      .then(response => {
        setVenteDetails(response.data.vente); 
        console.log(response.data.vente)// Utilisez response.data.vente pour accéder aux détails de la vente
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des détails de la vente:', error);
      });

    // Récupérer les données des articles depuis l'API
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/articles');
        const articles = response.data.articles;

        const articleMap = {};
        for (const article of articles) {
          articleMap[article.id] = article;
        }

        setArticleMap(articleMap);
      } catch (error) {
        console.error('Erreur lors de la récupération des articles:', error);
      }
    };

    fetchArticles();
  }, [venteId]);

  if (venteDetails.length === 0) {
    return <div>Chargement en cours...</div>;
  }
  const nomClient = venteDetails.client.nom;
  const emailClient = venteDetails.client.email;
  const localisationClient = venteDetails.client.localisation;
  const venteArticles = venteDetails.articleData; // Utilisez directement venteDetails.articleData
  const numeroFacture = formatNumeroFacture(venteId);
 
  const downloadPDF = () => {
    const section = document.getElementById('download_section'); // ID de la section à télécharger
    const pdfOptions = {
      margin: 10,
      filename: `facture_${numeroFacture}.pdf`, // Nom du fichier PDF
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };
  
    html2pdf().from(section).set(pdfOptions).save();
  };

  return (
    <div className="cs-container" >
    <div className="cs-invoice cs-style1" id="download_section">
      <div className="cs-invoice_in" >
        <div className="cs-invoice_head cs-type1 cs-mb25">
        <div className="cs-invoice_left" style={{width:'50%'}}>
            <p className="cs-invoice_number cs-primary_color cs-mb5 cs-f16">
              <b className="cs-primary_color">Facture  No: #{numeroFacture}</b> 
            </p>
            <p className="cs-invoice_date cs-primary_color cs-m0">
              <b className="cs-primary_color">Date: </b>{format(new Date(venteDetails.dateVente), 'dd-MM-yyyy')}
            </p>
          </div>
          <div className="cs-invoice_right cs-text_right">
          <div className="cs-logo cs-mb5" style={{width:'50%',float:'right'}}>
          <img src={logo} alt="logo" style={{maxWidth:'55%'}}/>
            </div>
          </div>
        </div>
        <div className="cs-invoice_head cs-mb10">
          <div className="cs-invoice_left">
            <b className="cs-primary_color">Emetteur:</b>
            <p>
              Soleil Communication <br />
              Abidjan, <br />
              Cocody Angré 22e Arrondissement, <br />
              Cote d'Ivoire
            </p>
          </div>
          <div className="cs-invoice_right cs-text_right">
            <b className="cs-primary_color">Addresse a:</b>
            <p>
            {nomClient} <br />
          {localisationClient} <br />
          {emailClient}
            </p>
          </div>
        </div>
        <div className="cs-table cs-style1">
          <div className="cs-round_border">
            <div className="cs-table_responsive">
              <table>
                <thead>
                  <tr>
                    <th className="cs-width_3 cs-semi_bold cs-primary_color cs-focus_bg">
                      Designation
                    </th>
                    <th className="cs-width_4 cs-semi_bold cs-primary_color cs-focus_bg">
                      Description
                    </th>
                    <th className="cs-width_2 cs-semi_bold cs-primary_color cs-focus_bg">
                      Qty
                    </th>
                    <th className="cs-width_1 cs-semi_bold cs-primary_color cs-focus_bg">
                    Prix U. HT  
                    </th>
                    <th className="cs-width_2 cs-semi_bold cs-primary_color cs-focus_bg cs-text_right">
                    Prix Total HT
                    </th>
                  </tr>
                </thead>
                <tbody>
                {venteArticles.map((articleData, index) => {
          const article = articleMap[articleData.articleId];
  
          if (!article) {
            return null;
          }
  
          const prixTotalArticle = articleData.quantite * articleData.prixVente;
  

  return (
    <tr key={index}>
      <td className="cs-width_3">
        {article.designation}
      </td>
      <td className="cs-width_4">
        {article.caracteristique}
      </td>
      <td className="cs-width_2">
        {articleData.quantite}
      </td>
      <td className="cs-width_1" style={{paddingLeft:42}}>
        {articleData.prixVente} {/* Utilisez le prix de vente de l'articleData */}
      </td>
      <td className="cs-width_2 cs-text_right">
      {prixTotalArticle} {/* Calcul du prix total */}
      </td>
    </tr>
  );
})}


  </tbody>
              </table>
            </div>
            
            <div className="cs-invoice_footer cs-border_top">
              <div className="cs-left_footer cs-mobile_hide">
                <p className="cs-mb0">
                  <b className="cs-primary_color">Additional Information:</b>
                </p>
                <p className="cs-m0">
                  At check in you may need to present the credit <br />
                  card used for payment of this ticket.
                </p>
              </div>
              <div className="cs-right_footer">
                <table>
                  <tbody>
<tr className="cs-border_left">
  <td className="cs-width_3 cs-semi_bold cs-primary_color cs-focus_bg">
   Total Remise
  </td>
  <td className="cs-width_3 cs-semi_bold cs-focus_bg cs-primary_color cs-text_right">
    {venteDetails.tauxRemise} Fcfa
  </td>
</tr>
<tr className="cs-border_left">
  <td className="cs-width_3 cs-semi_bold cs-primary_color cs-focus_bg">
    Montant TVA (18%)
  </td>
  <td className="cs-width_3 cs-semi_bold cs-focus_bg cs-primary_color cs-text_right">
  {venteDetails.montantTVA} Fcfa
 
  </td>
</tr>
<tr className="cs-border_left">
  <td className="cs-width_3 cs-semi_bold cs-primary_color cs-focus_bg">
  Remise TTC
  </td>
  <td className="cs-width_3 cs-semi_bold cs-focus_bg cs-primary_color cs-text_right">
    {venteDetails.remiseTotalPourcent} Fcfa
  </td>
</tr>
<tr className="cs-border_left">
  <td className="cs-width_3 cs-semi_bold cs-primary_color cs-focus_bg">
    Montant Net  TTC
  </td>
  <td className="cs-width_3 cs-semi_bold cs-focus_bg cs-primary_color cs-text_right">
  {venteDetails.montantTotal} Fcfa
  </td>
</tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="cs-invoice_head cs-mb10" style={{paddingTop:'20px'}}>
          <div className="cs-invoice_left">
             <div>
             <b className="cs-primary_color">Condition de paiement:</b>
            <p>
              100%
            </p>
             </div>
             <div>
             <b className="cs-primary_color">Moyen de paiement :</b>
            <p>
              Cheque/Espece
            </p>
             </div>
          </div>
          <div className="cs-invoice_right cs-text_right">
            <b className="cs-primary_color">Signature:</b>
          </div>
        </div>
        <div className="cs-note" style={{marginTop:'11px'}}>
          <div className="cs-note_left">
          </div>
          <div className="cs-note_right">
                <hr /> {/* Add the <hr> tag here to create the horizontal line */}
                <p className="cs-m0">
                  SARL au Capital de 1.000.000 FCFA -Siège social : Abidjan, Cocody Angré 22e Arrondissement, Cité Manguier, EPP
                  Résidences Latrilles.02 BP 55 CIDEX 02 - SAV : (+225) 0769008426 / (225) 0101939558 Régime : TEE - NO CC 2055361 F
                  R.C.NO CI-ABJ-2020-B-17877 Coris Bank Internationale :C116 6060 0800 6761 8241 0167 
                </p>
              </div>
        </div>
        {/* .cs-note */}
      </div>
      
    </div>
    <div className="cs-hide-print">
    <div className="cs-invoice_btns cs-hide_print">
    <a href="#" className="cs-invoice_btn cs-color1" onClick={() => window.print()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ionicon"
          viewBox="0 0 512 512"
        >
          <path
            d="M384 368h24a40.12 40.12 0 0040-40V168a40.12 40.12 0 00-40-40H104a40.12 40.12 0 00-40 40v160a40.12 40.12 0 0040 40h24"
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth={32}
          />
          <rect
            x={128}
            y={240}
            width={256}
            height={208}
            rx="24.32"
            ry="24.32"
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth={32}
          />
          <path
            d="M384 128v-24a40.12 40.12 0 00-40-40H168a40.12 40.12 0 00-40 40v24"
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth={32}
          />
          <circle cx={392} cy={184} r={24} />
        </svg>
        <span>Imprimer</span>
      </a>
      <button id="download_btn" className="cs-invoice_btn cs-color2" onClick={downloadPDF}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ionicon"
          viewBox="0 0 512 512"
        >
          <title>Telecharger</title>
          <path
            d="M336 176h40a40 40 0 0140 40v208a40 40 0 01-40 40H136a40 40 0 01-40-40V216a40 40 0 0140-40h40"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={32}
          />
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={32}
            d="M176 272l80 80 80-80M256 48v288"
          />
        </svg>
        <span>Download</span>
      </button>
      </div>
      </div>
  </div>
  )
}

export default FactureVente
