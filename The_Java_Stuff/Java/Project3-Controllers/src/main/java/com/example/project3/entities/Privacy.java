package com.example.project3.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

@ToString
@Table(name = "Privacy")
public class Privacy {
    @Id
    @SequenceGenerator(
            name = "privacy_sequence",
            sequenceName = "privacy_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "privacy_sequence"
    )



    private Long privacyid;
    @Column(name = "email")
    private Boolean email;
    @Column(name = "dob")
    private Boolean dob;
    @Column(name = "gender")
    private Boolean gender;
    @Column(name = "name")
    private Boolean name;
    @Column(name = "bio")
    private Boolean bio;

    public Long getPrivacyid() {
        return privacyid;
    }

    public void setPrivacyid(Long privacyid) {
        this.privacyid = privacyid;
    }

    public Boolean getEmail() {
        return email;
    }

    public void setEmail(Boolean email) {
        this.email = email;
    }

    public Boolean getDob() {
        return dob;
    }

    public void setDob(Boolean dob) {
        this.dob = dob;
    }

    public Boolean getGender() {
        return gender;
    }

    public void setGender(Boolean gender) {
        this.gender = gender;
    }

    public Boolean getName() {
        return name;
    }

    public void setName(Boolean name) {
        this.name = name;
    }

    public Boolean getBio() {
        return bio;
    }

    public void setBio(Boolean bio) {
        this.bio = bio;
    }
}
