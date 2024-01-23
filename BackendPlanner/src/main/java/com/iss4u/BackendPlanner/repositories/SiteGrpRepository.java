package com.iss4u.BackendPlanner.repositories;

import com.iss4u.BackendPlanner.entities.SiteGrp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SiteGrpRepository extends JpaRepository<SiteGrp, Long> {
    //@Query(value="SELECT site_grp_nm siteGrpNm FROM Site_group WHERE Site_group.site_grp_nm = ?1",nativeQuery = true)
    SiteGrp findBySiteGrpNm(String siteGrpNm);
}
