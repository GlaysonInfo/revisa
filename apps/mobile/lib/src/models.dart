class LoginResponse {
  final String accessToken;
  final String refreshToken;

  LoginResponse({required this.accessToken, required this.refreshToken});

  factory LoginResponse.fromJson(Map<String, dynamic> json) {
    return LoginResponse(
      accessToken: json['access_token'] as String,
      refreshToken: json['refresh_token'] as String? ?? '',
    );
  }
}

class CitizenPayload {
  final String fullName;
  final String? phone;
  final String? email;
  final String? neighborhood;
  final String? poleName;
  final String? address;
  final String? referencePoint;
  final String? notes;
  final bool consentGiven;

  CitizenPayload({
    required this.fullName,
    this.phone,
    this.email,
    this.neighborhood,
    this.poleName,
    this.address,
    this.referencePoint,
    this.notes,
    required this.consentGiven,
  });

  Map<String, dynamic> toJson() => {
        'full_name': fullName,
        'phone': phone,
        'email': email,
        'neighborhood': neighborhood,
        'pole_name': poleName,
        'address': address,
        'reference_point': referencePoint,
        'notes': notes,
        'registered_in_field': true,
        'consent_given': consentGiven,
      };
}

class CitizenSummary {
  final String id;
  final String fullName;
  final String phone;
  final String neighborhood;
  final String poleName;
  final String collaboratorName;

  CitizenSummary({
    required this.id,
    required this.fullName,
    required this.phone,
    required this.neighborhood,
    required this.poleName,
    required this.collaboratorName,
  });

  factory CitizenSummary.fromJson(Map<String, dynamic> json) {
    return CitizenSummary(
      id: json['id'] as String,
      fullName: json['full_name'] as String,
      phone: (json['phone'] ?? '') as String,
      neighborhood: (json['neighborhood'] ?? '') as String,
      poleName: (json['pole_name'] ?? '') as String,
      collaboratorName: (json['collaborator_name'] ?? '') as String,
    );
  }
}

class CitizenDetail {
  final String id;
  final String fullName;
  final String phone;
  final String email;
  final String neighborhood;
  final String poleName;
  final String address;
  final String referencePoint;
  final String notes;
  final String collaboratorName;
  final bool consentGiven;

  CitizenDetail({
    required this.id,
    required this.fullName,
    required this.phone,
    required this.email,
    required this.neighborhood,
    required this.poleName,
    required this.address,
    required this.referencePoint,
    required this.notes,
    required this.collaboratorName,
    required this.consentGiven,
  });

  factory CitizenDetail.fromJson(Map<String, dynamic> json) {
    return CitizenDetail(
      id: json['id'] as String,
      fullName: json['full_name'] as String,
      phone: (json['phone'] ?? '') as String,
      email: (json['email'] ?? '') as String,
      neighborhood: (json['neighborhood'] ?? '') as String,
      poleName: (json['pole_name'] ?? '') as String,
      address: (json['address'] ?? '') as String,
      referencePoint: (json['reference_point'] ?? '') as String,
      notes: (json['notes'] ?? '') as String,
      collaboratorName: (json['collaborator_name'] ?? '') as String,
      consentGiven: (json['consent_given'] ?? false) as bool,
    );
  }
}
