package com.iss4u.BackendPlanner.services;

import com.iss4u.BackendPlanner.entities.Service;
import com.iss4u.BackendPlanner.entities.Site;

import java.util.List;
import java.util.Optional;

public interface SiteService {

    void create(Site site);

    List<Site> retrieveSites();

    Optional<Site> getSiteByKy(Long siteKy);

    Site getSiteByNm(String siteNm);

    String getSiteNameByKey(Long siteKy);

    void update(Long siteKy, Site updatedSite);

    void delete(Long siteKy);


}
