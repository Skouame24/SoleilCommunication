import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Finance = () => {
    const [totalAchats, setTotalAchats] = useState(0);
    const [totalVentes, setTotalVentes] = useState(0);
    const [totalBenefice, setTotalBenefice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [articles, setArticles] = useState([]); 
    const [salesData, setSalesData] = useState([]);
    const [achats, setAchats] = useState([]); // State to store achats data
    const [dailyData, setDailyData] = useState([]); // State to store daily data


    useEffect(() => {
        // Fetch achats data
        axios.get('http://localhost:5001/api/achats')
            .then(response => {
                const achatsData = response.data.achats;

                // Extract and group achats data by day
                const achatsByDay = {};
                for (const achat of achatsData) {
                    const date = new Date(achat.dateAchat).toLocaleDateString();
                    if (!achatsByDay[date]) {
                        achatsByDay[date] = 0;
                    }
                    achatsByDay[date] += achat.montantTotal;
                }

                // Fetch ventes data
                axios.get('http://localhost:5001/api/ventes')
                    .then(response => {
                        const ventesData = response.data.ventes;

                        // Extract and group ventes data by day
                        const ventesByDay = {};
                        for (const vente of ventesData) {
                            const date = new Date(vente.dateVente).toLocaleDateString();
                            if (!ventesByDay[date]) {
                                ventesByDay[date] = 0;
                            }
                            for (const articleVente of vente.articleData) {
                                ventesByDay[date] += articleVente.prixVente;
                            }
                        }

                        // Combine achats and ventes data by day
                        const combinedData = Object.keys(achatsByDay).map(date => ({
                            day: date,
                            achats: achatsByDay[date] || 0,
                            ventes: ventesByDay[date] || 0,
                        }));

                        setDailyData(combinedData);
                    })
                    .catch(error => {
                        console.error('Erreur lors de la récupération des ventes:', error);
                    });
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des achats:', error);
            });
    }, []);

    useEffect(() => {
        // Fetch achats data
        axios.get('http://localhost:5001/api/achats')
            .then(response => {
                const achatsData = response.data.achats;
                setAchats(achatsData);

                const sumMontantTotalAchats = achatsData.reduce((total, achat) => total + achat.montantTotal, 0);
                setTotalAchats(sumMontantTotalAchats);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des achats:', error);
            });

        // Fetch ventes data
        axios.get('http://localhost:5001/api/ventes')
            .then(response => {
                const ventesData = response.data.ventes;
                const sumMontantTotalVentes = ventesData.reduce((total, vente) => total + vente.montantTotal, 0);
                setTotalVentes(sumMontantTotalVentes);
                setSalesData(ventesData);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des ventes:', error);
            });

        // Fetch articles data
        axios.get('http://localhost:5001/api/articles')
            .then(response => {
                const articlesData = response.data.articles;
                setArticles(articlesData);

                // Calculer la somme totale des quantités des articles
                let sumTotalQuantity = 0;
                for (const article of articlesData) {
                    sumTotalQuantity += article.quantite;
                }
                setTotalQuantity(sumTotalQuantity);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des articles:', error);
            });
    }, []);

    useEffect(() => {
        // Fonction pour calculer le bénéfice des ventes
        const calculateSalesBenefit = () => {
            let sumBenefice = 0;
            for (const vente of salesData) {
                for (const articleVente of vente.articleData) {
                    const achatCorrespondant = achats.find(achat => {
                        return achat.articlesData.some(articleAchat => articleAchat.articleId === articleVente.articleId);
                    });
            
                    if (achatCorrespondant) {
                        const prixAchatArticle = achatCorrespondant.articlesData.find(articleAchat => {
                            return articleAchat.articleId === articleVente.articleId;
                        }).prix;
        
                        const beneficeArticle = articleVente.prixVente - prixAchatArticle;
                        console.log("Article Vendu :", articleVente);
                        console.log("Prix de Vente :", articleVente.prixVente);
                        console.log("Prix d'Achat :", prixAchatArticle);
                        console.log("Bénéfice de l'article :", beneficeArticle);
                        sumBenefice += beneficeArticle;
                    }
                }
            }
            return sumBenefice;
        };
        
        // Calculer le bénéfice des ventes et mettre à jour le state
        const totalSalesBenefit = calculateSalesBenefit();
        setTotalBenefice(totalSalesBenefit);
    }, [totalAchats, totalVentes, salesData, articles, achats]);
  
  return (
    <div>

{/*  <!-- Page Heading --> */}
<div className="d-sm-flex align-items-center justify-content-between mb-4">
<h2 className='header'> Gerer mes finances </h2>
    <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
        className="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
</div>

{/*  <!-- Content Row --> */}
<div className="row">

    {/*  <!-- Earnings (Monthly) Card Example --> */}
    <div className="col-xl-3 col-md-6 mb-4">
        <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
                <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                            Total achat (Mois)</div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">FCFA {totalAchats}</div>
                    </div>
                    <div className="col-auto">
                        <i className="fas fa-calendar fa-2x text-gray-300"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/*  <!-- Earnings (Monthly) Card Example --> */}
    <div className="col-xl-3 col-md-6 mb-4">
        <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
                <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                            Total vente (Mois)</div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">FCFA {totalVentes}</div>
                    </div>
                    <div className="col-auto">
                        <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/*  <!-- Earnings (Monthly) Card Example --> */}
    <div className="col-xl-3 col-md-6 mb-4">
        <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
                <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Total stock
                        </div>
                        <div className="row no-gutters align-items-center">
                            <div className="col-auto">
                                <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{totalQuantity} </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className="col-auto">
                        <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/*  <!-- Pending Requests Card Example --> */}
    <div className="col-xl-3 col-md-6 mb-4">
        <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
                <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                            Benefice</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">FCFA {totalBenefice} </div>
                    </div>
                    <div className="col-auto">
                        <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

{/*  <!-- Content Row --> */}

<div className="row">

    {/*   <!-- Area Chart --> */}
    <div className="col-xl-8 col-lg-7">
                <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">Earnings Overview</h6>
                    </div>
                    <div className="card-body">
                        <div className="chart-area">
                            <BarChart width={600} height={300} data={dailyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="achats" fill="#8884d8" />
                                <Bar dataKey="ventes" fill="#82ca9d" />
                            </BarChart>
                        </div>
                    </div>
                </div>
            </div>
        
    {/*  <!-- Pie Chart --> */}
    <div className="col-xl-4 col-lg-5">
        <div className="card shadow mb-4">
            {/*  <!-- Card Header - Dropdown --> */}
            <div
                className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Revenue Sources</h6>
                <div className="dropdown no-arrow">
                    <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                        aria-labelledby="dropdownMenuLink">
                        <div className="dropdown-header">Dropdown Header:</div>
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                </div>
            </div>
            {/*  <!-- Card Body --> */}
            <div className="card-body">
                <div className="chart-pie pt-4 pb-2">
                    <canvas id="myPieChart"></canvas>
                </div>
                <div className="mt-4 text-center small">
                    <span className="mr-2">
                        <i className="fas fa-circle text-primary"></i> Direct
                    </span>
                    <span className="mr-2">
                        <i className="fas fa-circle text-success"></i> Social
                    </span>
                    <span className="mr-2">
                        <i className="fas fa-circle text-info"></i> Referral
                    </span>
                </div>
            </div>
        </div>
    </div>
</div>



</div>
  )
}

export default Finance