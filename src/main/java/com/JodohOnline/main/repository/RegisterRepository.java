package com.JodohOnline.main.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.JodohOnline.main.entity.Register;

public interface RegisterRepository extends JpaRepository<Register, Long>{
	
	@Query(value = "SELECT *\n"
			+ "from user\n"
			+ "Where (CASE "
			+ "WHEN 'name'=:type THEN name LIKE %:value% "
			+ "WHEN 'phone'=:type THEN phone LIKE %:value% "
			+ "WHEN 'address'=:type THEN address LIKE %:value% "
			+ "WHEN 'email'=:type THEN email LIKE %:value% "
			+ "END)",nativeQuery=true)
	
	List<Register> findBySearchBy(@Param("type")String type,@Param("value")String value);

	@Query(value="SELECT * from register where username=?1 and phone=?2",nativeQuery = true)
	Register findByLogin(String username, String phone);
	
	@Query(value="SELECT * from register whare gender", nativeQuery = true)
	Register findByGender(String gender);
	
	Register findByUsername(String username); 
}