const Analytics = require("../models/Analytics");

const incrementVisitor = async (req, res) => {
    try {

        await Analytics.findOneAndUpdate(
            {},
            {
                $inc: {
                    totalVisitors: 1,
                },

                $set: {
                    lastVisitAt: new Date(),
                },

                $setOnInsert: {
                    totalProjectViews: 0,
                },
            },
            {
                upsert: true,
                new: true,
            }
        );

        return res.status(200).json({
            success: true,
            message: "Visitor counted successfully.",
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const incrementProjectView = async (req, res) => {
    try {

        await Analytics.findOneAndUpdate(
            {},
            {
                $inc: {
                    totalProjectViews: 1,
                },
            },
            {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true,
            }
        );

        return res.status(200).json({
            success: true,
            message: "Project view counted successfully.",
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const getAnalytics = async (req, res) => {
    try {

        let analytics = await Analytics.findOne();

        if (!analytics) {

            analytics = await Analytics.create({});

        }

        return res.status(200).json({
            success: true,
            data: analytics,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

module.exports = {
    incrementVisitor,
    incrementProjectView,
    getAnalytics,
};