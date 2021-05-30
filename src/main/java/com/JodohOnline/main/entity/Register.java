package com.JodohOnline.main.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor


@Entity
@Table(name="register")
public class Register {

		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private long id;
		
		private String username;
		private String name;
		private String gender;
		private String phone;
		private String age;
		private String image;


	}

