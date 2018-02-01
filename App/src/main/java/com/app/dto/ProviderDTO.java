package com.app.dto;

public class ProviderDTO{

    private String id;
    private String firstName;
    private String lastName;
    private String middleName;
    private String email;
    private Integer employerId;
    private String providerType;
    private String staffStatus;
    private Integer assignedTo;
    private String status;
    private Integer createdBy;
    private Integer updatedBy;
    private String projectedStartDate;
    private SpecialtyDTO specialtyDTO;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getEmployerId() {
        return employerId;
    }

    public void setEmployerId(Integer employerId) {
        this.employerId = employerId;
    }

    public String getProviderType() {
        return providerType;
    }

    public void setProviderType(String providerType) {
        this.providerType = providerType;
    }

    public String getStaffStatus() {
        return staffStatus;
    }

    public void setStaffStatus(String staffStatus) {
        this.staffStatus = staffStatus;
    }

    public Integer getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(Integer assignedTo) {
        this.assignedTo = assignedTo;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Integer createdBy) {
        this.createdBy = createdBy;
    }

    public Integer getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(Integer updatedBy) {
        this.updatedBy = updatedBy;
    }

    public String getProjectedStartDate() {
        return projectedStartDate;
    }

    public void setProjectedStartDate(String projectedStartDate) {
        this.projectedStartDate = projectedStartDate;
    }

    public SpecialtyDTO getSpecialtyDTO() {
        return specialtyDTO;
    }

    public void setSpecialtyDTO(SpecialtyDTO specialtyDTO) {
        this.specialtyDTO = specialtyDTO;
    }


}
