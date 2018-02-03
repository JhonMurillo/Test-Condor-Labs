SELECT 
    COUNT(*) AS 'Active Licensees With Address Info'
FROM
    (SELECT 
        COUNT(upro.id_user)
    FROM
        user_profile upro
    JOIN user_address uadd ON upro.id_user = uadd.id_user
    JOIN user_role urole ON upro.id_user = urole.id_user
    WHERE
        urole.in_status = 1 AND upro.id_user > 0
            AND urole.cd_role_type IN ('LICENSEE' , 'LIMITED')
    GROUP BY upro.id_user) total