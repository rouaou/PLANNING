package iss4u.ehr.backoffice.parameterization.material_resources.entities.enumerations;

public enum BedType {
    HOSPITAL_BED("Hospital Bed"),
    ICU_BED("Intensive Care Unit Bed"),
    ELECTRIC_BED("Electric Bed"),
    BARIATRIC_BED("Bariatric Bed"),
    HOMECARE_BED("Homecare Bed"),
    PALLIATIVE_CARE_BED("Palliative Care Bed"),
    LOW_BED("Low Bed"),
    STRETCHER("Stretcher"),
    OPERATING_ROOM_TABLE("Operating Room Table"),
    PEDIATRIC_BED("Pediatric Bed"),
    OBSTETRIC_BED("Obstetric Bed"),
    RECOVERY_BED("Recovery Bed");

    private final String displayName;

    BedType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}

