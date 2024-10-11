const Chart = require("../models/chartModel");

const getChartData = async (req, res) => {
    try {
        Chart.getChartData(req.user.id, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json(results);
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: 0,
            message: "Internal server error"
        });
    }
}


module.exports = { getChartData };
