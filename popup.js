module.exports = function () {


    const pg = require("pg");
    const Pool = pg.Pool;
    const connectionString = process.env.DATABASE_URL || 'postgresql://kagiso:123@localhost:5432/popup';
    const pool = new Pool({
        connectionString
    });


    //adds city selected to database 
    async function addCity(city) {

        const checking = await pool.query(`select id from popup where region = $1`, [city])
        if (checking.rowCount === 0) {
            await pool.query(`insert into popup (region, counter) values ($1, 0)`, [city]);
        }
        await pool.query(`update popup set counter = counter+1 where region = $1`, [city])
    }

    //gets counter for each time city was counted on dataBase
    async function eachRegion() {
        const counter = await pool.query(`select count(*) as region from popup`)
        return counter.rows[0].counter;
    }
    //adds popup name
    async function addPopup(region, item) {
        const checking = await pool.query(`select id from popup where heading = $1 and region = $2`, [item, region])
        if (checking.rowCount === 0) {
            await pool.query(`insert into popup (heading, region, counter) values ($1, $2, 0)`, [item, region]);
        }
        await pool.query(`update popup set counter = counter+1 where heading = $1 and region = $2`, [item, region])
    }


    async function eachPopType() {
        const counter = await pool.query(`select count(*) as heading from popup`)
        return counter.rows[0].counter;
    }

    async function addPopType(region, currentType, item) {
        const checking = await pool.query(`select id from popup where type = $1 and region = $2 and heading = $3`,
            [item, region, currentType])

        if (checking.rowCount === 0) {
            await pool.query(`insert into popup (type, region, heading,  counter) values ($1, $2, $3, 0)`,
                [item, region, currentType]);
        }

        await pool.query(`update popup set counter = counter+1 where type = $1 and region = $2 and heading = $3`,
            [item, region, currentType])

    }


    async function countPopType() {
        const counter = await pool.query(`select count(*) as typee from popup`)
        return counter.rows[0].counter;
    }

    async function fetchInfoFor(city) {
        var cpt = 0;
        var jhb = 0;
        var dbn = 0;

        var res = await pool.query(`select * from popup`);
        var popup = res.rows;
        for (let i = 0; i < popup.length; i++) {
            if (popup.region === city) {
                return counter
            }
        }
        console.log(popup)
    }
    return {
        addCity,
        addPopup,
        eachRegion,
        eachPopType,
        addPopType,
        countPopType,
        fetchInfoFor

    }


}