import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Facture.css';
import { format, parseISO } from 'date-fns';


const formatNumeroFacture = (id) => {
  return `FACT-${id.toString().padStart(3, '0')}`;
};

const Facture = () => {
  const { achatId } = useParams();
  const [achatDetails, setAchatDetails] = useState([]);
  const [articleMap, setArticleMap] = useState({}); // Tableau pour stocker les articles par ID
  const [numFacture, setNumFacture] = useState('');


  useEffect(() => {
    // Récupérer les détails de l'achat depuis votre API en utilisant achatId
    axios.get(`http://localhost:5001/api/achats/${achatId}`)
      .then(response => {
        setAchatDetails(response.data); 
        console.log(response.data)// Mettre à jour les détails de l'achat
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des détails de l\'achat:', error);
      });
       // Récupérer les données des articles depuis votre API
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/articles');
        const articles = response.data.articles;
   console.log(articles)

        // Créer un objet de mappage des articles par ID
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
  }, [achatId]);

  useEffect(() => {
    if (achatDetails.length !== 0) {
      const numeroFacture = formatNumeroFacture(achatId);
      setNumFacture(numeroFacture);
    }
  }, [achatDetails, achatId]);

  if (achatDetails.length === 0) {
    return <div>Chargement en cours...</div>;
  }
  

  // Extraire les informations du fournisseur
  const fournisseur = achatDetails.achat.fournisseur;
  const nomFournisseur = fournisseur.nom;
  const emailFournisseur = fournisseur.email;
  const localisationFournisseur = fournisseur.localisation;
  const achatArticles = achatDetails.achat.achatArticles;
  const articlesData = achatDetails.achat.articlesData;
    return (
    <div className="cs-container">
  <div className="cs-invoice cs-style1">
    <div className="cs-invoice_in" id="download_section">
      <div className="cs-invoice_head cs-type1 cs-mb25">
        <div className="cs-invoice_left">
          <p className="cs-invoice_number cs-primary_color cs-mb5 cs-f16">
            <b className="cs-primary_color">Facture  No:</b> #{numFacture}
          </p>
          <p className="cs-invoice_date cs-primary_color cs-m0">
  <b className="cs-primary_color">Date: </b>
  {achatDetails.dateAchat}
</p>

        </div>
        <div className="cs-invoice_right cs-text_right">
          <div className="cs-logo cs-mb5">
            <img src="assets/img/logo.svg" alt="Logo" />
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
          {nomFournisseur} <br />
          {localisationFournisseur} <br />
          {emailFournisseur}
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
                    Prix U. TTC  
                  </th>
                  <th className="cs-width_2 cs-semi_bold cs-primary_color cs-focus_bg cs-text_right">
                    Prix Total TTC
                  </th>
                </tr>
              </thead>
              <tbody>
  {articlesData.map((articleData, index) => {
    const article = articleMap[articleData.articleId];
    console.log("Article Data:", articleData);
    console.log("Article:", article);

    if (!article) {
      console.log("Article not found for ID:", articleData.articleId);
      return null; // Article non trouvé dans la liste des articles
    }

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
        <td className="cs-width_1">
        {articleData.prix} {/* Utilisez le prix d'achat de l'article */}
        </td>
        <td className="cs-width_2 cs-text_right">
          {/* Calculer le prix total TTC en multipliant la quantité par le prix d'achat */}
          {articleData.quantite * articleData.prix}
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
                     Total TTC 
                    </td>
                    <td className="cs-width_3 cs-semi_bold cs-focus_bg cs-primary_color cs-text_right">
                   
                    </td>
                  </tr>
                  <tr className="cs-border_left">
                    <td className="cs-width_3 cs-semi_bold cs-primary_color cs-focus_bg">
                    Remise
                    </td>
                    <td className="cs-width_3 cs-semi_bold cs-focus_bg cs-primary_color cs-text_right">
                    {achatDetails.achat.tauxRemise} Fcfa    
                    </td>
                  </tr>
                  <tr className="cs-border_left">
                    <td className="cs-width_3 cs-semi_bold cs-primary_color cs-focus_bg">
                    Montant Net Total TTC
                    </td>
                    <td className="cs-width_3 cs-semi_bold cs-focus_bg cs-primary_color cs-text_right">
                    {achatDetails.achat.montantTotal}   Fcfa
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="cs-invoice_head cs-mb10" style={{paddingTop:'60px'}}>
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
    <div className="cs-invoice_btns cs-hide_print">
      <a href="javascript:window.print()" className="cs-invoice_btn cs-color1">
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
      <button id="download_btn" className="cs-invoice_btn cs-color2">
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

export default Facture
