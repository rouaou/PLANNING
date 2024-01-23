package com.iss4u.BackendPlanner.repositories;

import com.iss4u.BackendPlanner.entities.Site;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SiteRepository extends JpaRepository<Site, Long> {
    Site findBySiteNm(String siteNm);
}
