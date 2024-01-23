package com.iss4u.BackendPlanner.controllers;

import com.iss4u.BackendPlanner.entities.Site;
import com.iss4u.BackendPlanner.entities.SiteGrp;
import com.iss4u.BackendPlanner.services.SiteGrpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/parameterization/sitegrp")
public class SiteGrpController {

    @Autowired
    private SiteGrpService siteGrpService;

    @PostMapping
    public ResponseEntity<SiteGrp> createSiteGrp(@RequestBody SiteGrp siteGrp) {
        siteGrpService.create(siteGrp);
        return new ResponseEntity<>(siteGrp, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<SiteGrp>> getAllSiteGrps() {
        List<SiteGrp> siteGrps = siteGrpService.retrieveSiteGrps();
        return new ResponseEntity<>(siteGrps, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SiteGrp> getSiteGrpById(@PathVariable("id") Long siteGrpId) {
        Optional<SiteGrp> siteGrp = siteGrpService.getSiteGrpByKy(siteGrpId);
        return siteGrp.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/SiteGrpName/{siteGrpNm}")
    public ResponseEntity<SiteGrp> getSiteGrpBySiteGrpNm(@PathVariable("siteGrpNm") String siteGrpNm) {
        SiteGrp siteGrp = siteGrpService.getSiteGrpByNm(siteGrpNm);
        if (siteGrp != null) {
            return new ResponseEntity<>(siteGrp, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{siteGroupKey}/name")
    public String getSiteGroupNameByKey(@PathVariable("siteGroupKey") Long siteGroupKey) {
        return siteGrpService.getSiteGroupNameByKey(siteGroupKey);
    }

    @PutMapping("/{siteGrpKy}")
    public ResponseEntity<SiteGrp> updateSiteGroup(@PathVariable Long siteGrpKy, @RequestBody SiteGrp updatedSiteGroup) {
        try {
            siteGrpService.update(siteGrpKy, updatedSiteGroup);
            return ResponseEntity.ok().build(); // Return 200 (OK) without a body
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.notFound().build();
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteSiteGrp(@PathVariable("id") Long siteGrpId) {
        Optional<SiteGrp> existingSiteGrp = siteGrpService.getSiteGrpByKy(siteGrpId);
        if (existingSiteGrp.isPresent()) {
            siteGrpService.delete(siteGrpId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}/child-elements")
    public ResponseEntity<List<Site>> getChildElements(@PathVariable("id") Long siteGrpId) {
        Optional<SiteGrp> siteGrp = siteGrpService.getSiteGrpByKy(siteGrpId);
        if (siteGrp.isPresent()) {
            List<Site> childElements = siteGrpService.getChildElements(siteGrp.get());
            return new ResponseEntity<>(childElements, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{id}/child-elements")
    public ResponseEntity<HttpStatus> addChildElement(@PathVariable("id") Long siteGrpId, @RequestBody Site site) {
        Optional<SiteGrp> siteGrp = siteGrpService.getSiteGrpByKy(siteGrpId);
        if (siteGrp.isPresent()) {
            siteGrpService.addChildElement(siteGrp.get(), site);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
