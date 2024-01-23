package com.iss4u.BackendPlanner.services;

import com.iss4u.BackendPlanner.entities.Site;
import com.iss4u.BackendPlanner.entities.SiteGrp;

import java.util.List;
import java.util.Optional;

public interface SiteGrpService {

    void create(SiteGrp siteGrp);

    List<SiteGrp> retrieveSiteGrps();

    Optional<SiteGrp> getSiteGrpByKy(Long siteGrpKy);

    SiteGrp getSiteGrpByNm(String siteGrpNm);

    String getSiteGroupNameByKey(Long siteGrpKy);

    void update(Long siteGrpKy, SiteGrp updatedSiteGrp);

    void delete(Long siteGrpKy);

    List<Site> getChildElements(SiteGrp siteGrp);

    void addChildElement(SiteGrp siteGrp, Site site);

}
