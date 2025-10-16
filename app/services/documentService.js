// Document Service
app.service('DocumentService', ['AuthService', function(AuthService) {
    var documents = [
        {
            id: 1,
            name: 'Annual Financial Report 2024',
            type: 'PDF',
            size: '2.4 MB',
            department: 'Finance',
            uploadedBy: 'John Doe',
            uploadedAt: new Date('2024-09-15'),
            status: 'signed',
            signedBy: 'John Doe',
            signedAt: new Date('2024-09-16'),
            signature: 'digital_signature_hash_12345',
            documentKey: 'FIN-2024-001',
            attachments: ['balance_sheet.pdf', 'income_statement.pdf']
        },
        {
            id: 2,
            name: 'Employee Onboarding Form',
            type: 'PDF',
            size: '1.1 MB',
            department: 'HR',
            uploadedBy: 'Jane Smith',
            uploadedAt: new Date('2024-10-01'),
            status: 'pending',
            documentKey: 'HR-2024-045',
            attachments: ['employment_contract.pdf']
        },
        {
            id: 3,
            name: 'Q3 Budget Proposal',
            type: 'PDF',
            size: '3.2 MB',
            department: 'Finance',
            uploadedBy: 'John Doe',
            uploadedAt: new Date('2024-10-10'),
            status: 'signed',
            signedBy: 'John Doe',
            signedAt: new Date('2024-10-11'),
            signature: 'digital_signature_hash_67890',
            documentKey: 'FIN-2024-002',
            attachments: ['budget_breakdown.xlsx', 'projections.pdf']
        }
    ];

    var nextId = 4;

    // Get documents filtered by department
    this.getDocuments = function() {
        var currentUser = AuthService.getCurrentUser();
        return documents.filter(function(d) {
            return d.department === currentUser.department;
        });
    };

    // Get document by ID
    this.getDocumentById = function(id) {
        var currentUser = AuthService.getCurrentUser();
        var doc = documents.find(function(d) {
            return d.id === id;
        });

        // Check department access
        if (doc && doc.department !== currentUser.department) {
            return null;
        }

        return doc;
    };

    // Upload new document
    this.uploadDocument = function(documentData) {
        var currentUser = AuthService.getCurrentUser();

        var newDoc = {
            id: nextId++,
            name: documentData.name,
            type: documentData.type || 'PDF',
            size: documentData.size || 'Unknown',
            department: currentUser.department,
            uploadedBy: currentUser.name,
            uploadedAt: new Date(),
            status: 'pending',
            documentKey: documentData.documentKey,
            attachments: documentData.attachments || []
        };

        documents.push(newDoc);
        return angular.copy(newDoc);
    };

    // Sign document (Admin only with password and key verification)
    this.signDocument = function(documentId, password, documentKey) {
        var currentUser = AuthService.getCurrentUser();

        if (currentUser.role !== 'administrator') {
            throw new Error('Only administrators can sign documents');
        }

        var doc = this.getDocumentById(documentId);
        if (!doc) {
            throw new Error('Document not found or access denied');
        }

        if (doc.status === 'signed') {
            throw new Error('Document is already signed');
        }

        // Verify document key
        if (doc.documentKey !== documentKey) {
            throw new Error('Invalid document key');
        }

        // In real implementation, verify password against user's actual password
        // For demo, we'll accept any password that matches the pattern
        if (!password || password.length < 6) {
            throw new Error('Invalid password');
        }

        // Generate signature hash (in real app, use proper cryptographic signing)
        var signatureHash = 'sig_' + Date.now() + '_' + Math.random().toString(36).substring(7);

        doc.status = 'signed';
        doc.signedBy = currentUser.name;
        doc.signedAt = new Date();
        doc.signature = signatureHash;
        doc.signatureEvidence = {
            ipAddress: '192.168.1.100',
            timestamp: new Date(),
            method: 'Digital Signature',
            certificate: 'SHA-256',
            adminPassword: '******'
        };

        return angular.copy(doc);
    };

    // Get document statistics
    this.getDocumentStats = function() {
        var currentUser = AuthService.getCurrentUser();
        var deptDocs = documents.filter(function(d) {
            return d.department === currentUser.department;
        });

        return {
            total: deptDocs.length,
            signed: deptDocs.filter(function(d) { return d.status === 'signed'; }).length,
            pending: deptDocs.filter(function(d) { return d.status === 'pending'; }).length,
            thisMonth: deptDocs.filter(function(d) {
                var now = new Date();
                var docDate = new Date(d.uploadedAt);
                return docDate.getMonth() === now.getMonth() &&
                       docDate.getFullYear() === now.getFullYear();
            }).length
        };
    };

    // Get signature evidence for a document
    this.getSignatureEvidence = function(documentId) {
        var doc = this.getDocumentById(documentId);
        if (!doc || doc.status !== 'signed') {
            return null;
        }
        return doc.signatureEvidence || null;
    };

    // Search documents
    this.searchDocuments = function(query) {
        var currentUser = AuthService.getCurrentUser();
        var deptDocs = this.getDocuments();

        return deptDocs.filter(function(d) {
            var searchStr = (d.name + ' ' + d.documentKey + ' ' + d.status).toLowerCase();
            return searchStr.indexOf(query.toLowerCase()) > -1;
        });
    };
}]);
