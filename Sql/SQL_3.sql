SELECT 
    COUNT(*) AS 'Non-active Providers'
FROM
    (SELECT 
        COUNT(upro.id_user)
    FROM
        user_role urole
    JOIN user_profile upro ON urole.id_user = upro.id_user
        AND urole.cd_role_type = 'PROVIDER'
        AND upro.id_user <= 0
        AND urole.in_status <> 1
    GROUP BY upro.id_user) total