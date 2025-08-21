
import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

export function Dashboard() {
    ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
    
    const data = {
        labels: ['Educational', 'Creative', 'Active', 'Puzzle', 'Building', 'Art'],
        datasets: [
            {
                label: 'Toy Categories',
                data: [25, 20, 15, 18, 12, 10],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                ],
                borderWidth: 2,
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    usePointStyle: true,
                    font: {
                        size: 14,
                        weight: '600'
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: 1,
                cornerRadius: 8,
                displayColors: true
            }
        },
        scales: {
            r: {
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                    lineWidth: 1
                },
                ticks: {
                    display: false
                }
            }
        }
    };

    return (
        <div className="dashboard-page">
            <div className="page-container">
                {/* Dashboard Header */}
                <div className="dashboard-header">
                    <h1>Dashboard</h1>
                    <p>Analytics and insights for your toy store</p>
                </div>

                {/* Stats Cards */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon">📊</div>
                        <div className="stat-content">
                            <h3>Total Sales</h3>
                            <p className="stat-number">$12,450</p>
                            <span className="stat-change positive">+15% from last month</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">🛍️</div>
                        <div className="stat-content">
                            <h3>Orders</h3>
                            <p className="stat-number">156</p>
                            <span className="stat-change positive">+8% from last month</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">👥</div>
                        <div className="stat-content">
                            <h3>Customers</h3>
                            <p className="stat-number">89</p>
                            <span className="stat-change positive">+12% from last month</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">⭐</div>
                        <div className="stat-content">
                            <h3>Rating</h3>
                            <p className="stat-number">4.8</p>
                            <span className="stat-change positive">+0.2 from last month</span>
                        </div>
                    </div>
                </div>

                {/* Chart Section */}
                <div className="chart-section">
                    <div className="chart-header">
                        <h2>Toy Category Distribution</h2>
                        <p>Sales breakdown by toy categories</p>
                    </div>
                    <div className="chart-container">
                        <PolarArea data={data} options={options} />
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="recent-activity">
                    <h2>Recent Activity</h2>
                    <div className="activity-list">
                        <div className="activity-item">
                            <div className="activity-icon">🆕</div>
                            <div className="activity-content">
                                <h4>New toy added</h4>
                                <p>Educational puzzle set added to inventory</p>
                                <span className="activity-time">2 hours ago</span>
                            </div>
                        </div>
                        <div className="activity-item">
                            <div className="activity-icon">💰</div>
                            <div className="activity-content">
                                <h4>Order completed</h4>
                                <p>Order #1234 completed successfully</p>
                                <span className="activity-time">4 hours ago</span>
                            </div>
                        </div>
                        <div className="activity-item">
                            <div className="activity-icon">👤</div>
                            <div className="activity-content">
                                <h4>New customer</h4>
                                <p>Sarah Johnson registered as new customer</p>
                                <span className="activity-time">6 hours ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



