use test;
SELECT 
    urole.cd_role_type AS 'User Type',
    COUNT(upro.id_user) AS 'Total Active',
    SUM(IFNULL(upro.nm_middle, 1)) AS 'No Middle Name'
FROM
    user_role urole
        JOIN
    user_profile upro ON upro.id_user = urole.id_user
WHERE
    upro.id_user > 0 AND urole.in_status = 1
GROUP BY urole.cd_role_type
ORDER BY urole.cd_role_type ASC;
